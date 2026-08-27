#!/usr/bin/env bash
# Bump Phaser in every Editor template, then increment marketplace template.json
# versions (zip cache-bust ?v=N). Discovers this repo from the script location.
#
# Usage:
#   ./update-phaser-all.sh
#   ./update-phaser-all.sh --check
#   ./update-phaser-all.sh --skip-increment
set -euo pipefail

CHECK_ONLY=0
SKIP_INCREMENT=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --check)           CHECK_ONLY=1 ;;
        --skip-increment)  SKIP_INCREMENT=1 ;;
        -h|--help)
            sed -n '2,10p' "$0"
            exit 0
            ;;
        *) echo "Unknown flag: $1" >&2; exit 1 ;;
    esac
    shift
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

if [[ ! -f "$ROOT/update-phaser.js" || ! -f "$ROOT/build.js" ]]; then
    echo "ERROR: this script must live in phaser-editor-v5-starter-templates." >&2
    exit 1
fi

ERRORS=0
OK()   { echo "OK: $*"; }
FAIL() { echo "ERROR: $*"; ERRORS=$((ERRORS + 1)); }

# PHASER_PATH = parent of the phaser/ clone. Infer sibling if unset.
if [[ -z "${PHASER_PATH:-}" ]]; then
    parent="$(dirname "$ROOT")"
    if [[ -f "$parent/phaser/package.json" ]]; then
        export PHASER_PATH="$parent"
        echo "PHASER_PATH unset; using sibling $PHASER_PATH"
    fi
fi

check() {
    echo ""
    echo "Templates repo : $ROOT"
    echo "PHASER_PATH    : ${PHASER_PATH:-<not set>}"
    echo ""

    if command -v node >/dev/null 2>&1; then OK "command node"; else FAIL "missing node"; fi
    if command -v npm >/dev/null 2>&1; then OK "command npm"; else FAIL "missing npm"; fi

    if [[ -z "${PHASER_PATH:-}" ]]; then
        FAIL "PHASER_PATH is not set (parent of a phaser/ clone)"
    elif [[ ! -f "$PHASER_PATH/phaser/package.json" ]]; then
        FAIL "no $PHASER_PATH/phaser/package.json"
    else
        local ver
        ver="$(node -p "require('$PHASER_PATH/phaser/package.json').version")"
        OK "Phaser $ver at $PHASER_PATH/phaser"
        if [[ ! -f "$PHASER_PATH/phaser/types/phaser.d.ts" ]]; then
            FAIL "missing types/phaser.d.ts — run npm run tsgen in the Phaser clone"
        else
            OK "types/phaser.d.ts"
        fi
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

echo "Updating Phaser in all templates..."
node "$ROOT/update-phaser.js"

if [[ "$SKIP_INCREMENT" -eq 1 ]]; then
    echo "Skipping template.json version bump (--skip-increment)."
else
    echo "Incrementing template.json versions..."
    node "$ROOT/increment-version-all-projects.js"
fi

echo ""
echo "Done. Next: skill upload-templates / ./publish-templates.sh"
echo "Built-ins (vite/webpack/basic-javascript) also changed; after upload, run"
echo "  phaser-editor-v5/desktop/get-starter-templates.sh"
echo "and commit those copies on the Editor repo."
