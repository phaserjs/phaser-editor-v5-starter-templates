---
name: upload-templates
description: >-
  Builds Phaser Editor v5 marketplace template zips and templates.json and
  uploads them to DigitalOcean Spaces prefix editor/metadata/templates-v5
  (CDN https://cdn.phaser.io/editor/metadata/templates-v5). Use when the user
  asks to publish starter templates, upload templates, sync templates-v5, run
  build.js / upload-build-to-spaces.sh, or refresh New Project starters/examples.
---

# Upload project templates (marketplace CDN)

Run the checked-in script in **`phaser-editor-v5-starter-templates`**. **Never** hardcode `/Users/arian/...`. **Never** print or commit Spaces keys or `.env`.

This is **not** skill `upload-release` (Editor installers live under `downloads/editor/`).

Prefix: `s3://phaser/editor/metadata/templates-v5/` → `https://cdn.phaser.io/editor/metadata/templates-v5/`

## Do this

1. Find the templates repo (`build.js` + `upload-build-to-spaces.sh`). Sibling of `phaser-editor-v5` unless the user is already in that clone.
2. Gitignored `.env` must contain:

```
PHASER_EDITOR_V5_TEMPLATES_URL=https://cdn.phaser.io/editor/metadata/templates-v5
```

Without it, `build.js` writes `undefined/…` into `templates.json`. Do not commit `.env`.

3. Check:

```bash
./publish-templates.sh --check
```

`s3cmd` same as Editor uploads (endpoint `nyc3.digitaloceanspaces.com`). Do not echo keys.

4. Dry-run first (unless the user already confirmed a real upload):

```bash
./publish-templates.sh --dry-run
```

That still runs `node build.js`, then `s3cmd sync --dry-run`.

5. Real upload + CDN 200s on the three `templates.json` files:

```bash
./publish-templates.sh
```

| Flag | Meaning |
|---|---|
| `--skip-build` | upload existing `build/` only |
| `--skip-verify` | skip CDN HTTP checks |

6. Report the CDN URLs. Marketplace **Starters/Examples** update without an Editor release. **Built-ins** (vite, webpack, basic-javascript) do **not** go on this CDN — if Phaser or those three changed, run `phaser-editor-v5/desktop/get-starter-templates.sh` and commit on the Editor repo, then skill `full-release-build`.

## Invariants

- `build.js` only zips `editor-*` folders that have `template.json`.
- Zip URLs include `?v=<integer>` from `template.json`. Bump via skill `update-templates-phaser` or `./increment-version-all-projects.js` **before** this skill, or the CDN may keep serving old zips.
- Do not `s3cmd sync` to `downloads/editor/`.
- `phaser-site/` is copied into `build/phaser/` as the “Phaser” New Project list (GitHub zips, not this repo’s `editor-*` folders).

## Never

- Upload without `--check` / `--dry-run` unless the user clearly asked to publish now.
- Commit `build/` or `.env`.
- Treat GitHub Releases as the template store.

## More detail

- Guide: `phaser-editor-v5/developer-docs/templates.md`
- Phaser bump first: skill `update-templates-phaser`
