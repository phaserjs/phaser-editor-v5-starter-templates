#!/usr/bin/env bash
# Build marketplace zips + templates.json and sync to
# s3://phaser/editor/metadata/templates-v5/
#
# Discovers this repo from the script location. Does not print s3cmd secrets.
#
# Usage:
#   ./publish-templates.sh --check
#   ./publish-templates.sh --dry-run
#   ./publish-templates.sh
#   ./publish-templates.sh --skip-build   # upload existing build/
set -euo pipefail

CHECK_ONLY=0
DRY_RUN=0
SKIP_BUILD=0
SKIP_VERIFY=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --check)        CHECK_ONLY=1 ;;
        --dry-run)      DRY_RUN=1 ;;
        --skip-build)   SKIP_BUILD=1 ;;
        --skip-verify)  SKIP_VERIFY=1 ;;
        -h|--help)
            sed -n '2,14p' "$0"
            exit 0
            ;;
        *) echo "Unknown flag: $1" >&2; exit 1 ;;
    esac
    shift
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
CDN="https://cdn.phaser.io/editor/metadata/templates-v5"

if [[ ! -f "$ROOT/build.js" || ! -f "$ROOT/upload-build-to-spaces.sh" ]]; then
    echo "ERROR: this script must live in phaser-editor-v5-starter-templates." >&2
    exit 1
fi

ERRORS=0
OK()   { echo "OK: $*"; }
FAIL() { echo "ERROR: $*"; ERRORS=$((ERRORS + 1)); }
WARN() { echo "WARNING: $*"; }

templates_url() {
    if [[ -n "${PHASER_EDITOR_V5_TEMPLATES_URL:-}" ]]; then
        echo "$PHASER_EDITOR_V5_TEMPLATES_URL"
        return
    fi
    if [[ -f "$ROOT/.env" ]]; then
        # shellcheck disable=SC1091
        set -a
        source "$ROOT/.env"
        set +a
    fi
    echo "${PHASER_EDITOR_V5_TEMPLATES_URL:-}"
}

check() {
    echo ""
    echo "Templates repo : $ROOT"
    echo ""

    if command -v node >/dev/null 2>&1; then OK "command node"; else FAIL "missing node"; fi
    if command -v npm >/dev/null 2>&1; then OK "command npm"; else FAIL "missing npm"; fi
    if command -v s3cmd >/dev/null 2>&1; then OK "command s3cmd"; else FAIL "missing s3cmd — brew install s3cmd && s3cmd --configure"; fi
    if command -v curl >/dev/null 2>&1; then OK "command curl"; else FAIL "missing curl"; fi

    if [[ -f "$HOME/.s3cfg" ]] || [[ -n "${S3CMD_CONFIG:-}" && -f "${S3CMD_CONFIG}" ]]; then
        OK "s3cmd config present"
    else
        FAIL "no ~/.s3cfg (endpoint nyc3.digitaloceanspaces.com, HTTPS yes)"
    fi

    local url
    url="$(templates_url)"
    if [[ -z "$url" ]]; then
        FAIL "PHASER_EDITOR_V5_TEMPLATES_URL missing. Add gitignored .env:"
        echo "       PHASER_EDITOR_V5_TEMPLATES_URL=$CDN" >&2
    elif [[ "$url" == *"undefined"* ]]; then
        FAIL "PHASER_EDITOR_V5_TEMPLATES_URL looks wrong: $url"
    else
        OK "PHASER_EDITOR_V5_TEMPLATES_URL=$url"
        if [[ "$url" != "$CDN" ]]; then
            WARN "not the production CDN ($CDN) — only continue if that is intentional"
        fi
    fi

    if [[ -d "$ROOT/node_modules/archiver" ]]; then
        OK "npm deps (archiver)"
    else
        WARN "node_modules missing — will npm install"
    fi

    if [[ "$SKIP_BUILD" -eq 1 && ! -d "$ROOT/build/starters" ]]; then
        FAIL "--skip-build but build/starters is missing"
    fi

    echo ""
    if [[ "$ERRORS" -gt 0 ]]; then
        echo "Prerequisites failed: $ERRORS error(s)."
        return 1
    fi
    echo "Prerequisites OK."
}

check
if [[ "$CHECK_ONLY" -eq 1 ]]; then
    exit 0
fi

if [[ ! -d "$ROOT/node_modules/archiver" ]]; then
    echo "npm install..."
    npm install
fi

if [[ "$SKIP_BUILD" -eq 0 ]]; then
    echo "Building zips + templates.json..."
    node "$ROOT/build.js"
    if grep -q "undefined/" "$ROOT/build/starters/templates.json" 2>/dev/null; then
        echo "ERROR: build/starters/templates.json contains undefined/ — fix .env and rebuild." >&2
        exit 1
    fi
    OK "build/starters/templates.json has a real base URL"
else
    echo "Skipping build (--skip-build)"
fi

args=()
[[ "$DRY_RUN" -eq 1 ]] && args+=(--dry-run)
"$ROOT/upload-build-to-spaces.sh" "${args[@]+"${args[@]}"}"

if [[ "$DRY_RUN" -eq 1 || "$SKIP_VERIFY" -eq 1 ]]; then
    echo "Skipping CDN verify."
else
    echo ""
    echo "--- CDN verify ---"
    local_fail=0
    for path in starters/templates.json examples/templates.json phaser/templates.json; do
        code="$(curl -sL -o /dev/null -w "%{http_code}" --max-time 30 "$CDN/$path" || echo 000)"
        if [[ "$code" == "200" ]]; then
            OK "200 $CDN/$path"
        else
            FAIL "$code $CDN/$path"
            local_fail=1
        fi
    done
    if grep -q '"zip_url": "https://cdn.phaser.io/editor/metadata/templates-v5/' "$ROOT/build/starters/templates.json"; then
        OK "local starters zip_url uses production CDN"
    else
        WARN "local starters zip_url is not the production CDN prefix"
    fi
    if [[ "$local_fail" -ne 0 ]]; then
        exit 1
    fi
fi

echo ""
echo "============================================================"
echo " TEMPLATES CDN  $CDN/"
if [[ "$DRY_RUN" -eq 1 ]]; then
    echo " DRY RUN — nothing was put on Spaces"
fi
echo "============================================================"
echo "Marketplace starters/examples are live after this sync."
echo "Built-ins still need phaser-editor-v5/desktop/get-starter-templates.sh + an Editor build."
