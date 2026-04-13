#!/usr/bin/env bash
# =============================================================================
# Upload local build/ folder to DigitalOcean Spaces
# =============================================================================
#
# Prerequisites:
#   - s3cmd installed and configured (or provide S3CMD_CONFIG below)
#
# Usage:
#   ./upload-build-to-spaces.sh
#   ./upload-build-to-spaces.sh --dry-run
# =============================================================================

set -euo pipefail

SPACES_BUCKET="phaser"
SPACES_PREFIX="editor/metadata/templates-v5" # no leading/trailing slash

# Optional: path to custom s3cmd config file (empty = ~/.s3cfg)
S3CMD_CONFIG=""

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$ROOT_DIR/build"

if [[ ! -d "$SOURCE_DIR" ]]; then
    echo "ERROR: '$SOURCE_DIR' not found."
    echo "Run the build first (for example: node build.js)."
    exit 1
fi

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "*** DRY RUN - no files will be uploaded ***"
    echo ""
fi

S3CMD=(s3cmd)
if [[ -n "$S3CMD_CONFIG" ]]; then
    S3CMD+=( -c "$S3CMD_CONFIG" )
fi

DEST_URI="s3://$SPACES_BUCKET/$SPACES_PREFIX/"

echo "Uploading '$SOURCE_DIR/' to '$DEST_URI'"
echo ""

SYNC_ARGS=(
    sync
    "$SOURCE_DIR/"
    "$DEST_URI"
    --recursive
    --acl-public
    --guess-mime-type
    --exclude ".DS_Store"
    --exclude "*/.DS_Store"
)

if [[ "$DRY_RUN" == "true" ]]; then
    SYNC_ARGS+=(--dry-run)
fi

"${S3CMD[@]}" "${SYNC_ARGS[@]}"

echo ""
echo "Done."
