---
name: update-templates-phaser
description: >-
  Updates the Phaser dependency in every Phaser Editor v5 project template
  (npm phaser@x and plain-JS jsDelivr + type defs), then increments
  template.json versions for marketplace zip cache-busting. Use when the user
  asks to bump Phaser in templates, update starter templates to a new Phaser,
  run update-phaser.js, or refresh editor-starter-template / editor-example
  projects after a Phaser release.
---

# Update Phaser in project templates

Run the checked-in script in **`phaser-editor-v5-starter-templates`**, not in the Editor monorepo. **Never** hardcode `/Users/arian/...`. **Never** commit `.env`.

This skill does **not** upload. After it, use skill **`upload-templates`**.

It also does **not** copy Phaser into the Scene Editor (skill **`update-scene-editor-phaser`**).

## Do this

1. Find the templates repo (folder that contains `update-phaser.js`, `build.js`, and `editor-starter-template-vite/`). Typical location: sibling of `phaser-editor-v5` (`$PHASEREDITOR5_HOME/phaser-editor-v5-starter-templates`).
2. `PHASER_PATH` must be the **parent** of a `phaser/` clone. If unset, the script uses a sibling `phaser/` next to the templates repo. The clone’s `package.json` `version` is what gets installed.
3. Check:

```bash
./update-phaser-all.sh --check
```

4. Update every template and bump marketplace `template.json` integers:

```bash
./update-phaser-all.sh
```

`--skip-increment` if you only wanted the Phaser pin and will bump versions yourself.

5. Report the Phaser version that was applied. Remind the user:
   - skill **`upload-templates`** / `./publish-templates.sh` to build + CDN
   - then `phaser-editor-v5/desktop/get-starter-templates.sh` (vite / webpack / basic-javascript are **not** on the CDN)

The build host is usually an Apple Silicon Mac; this skill only needs Node and npm (any Mac is fine).

## Invariants

- Node templates: `npm install phaser@<version>` (`package.json` + `phasereditor2d.config.json`).
- Plain JS (basic-javascript): `index.html` jsDelivr `phaser.min.js` + copy `types/phaser.d.ts` and `matter.d.ts`.
- `phaser-site/` (New Project “Phaser” list) is **not** touched.
- Built-ins have **no** `template.json`; increment only affects marketplace folders.
- Needs `types/phaser.d.ts` in the Phaser clone (`npm run tsgen` there if missing).

## Never

- Run `upload-release` / `s3://phaser/downloads/editor/` for these zips.
- Commit `build/` or `.env`.
- Invent a Phaser version; read it from `$PHASER_PATH/phaser/package.json`.

## More detail

- Guide: `phaser-editor-v5/developer-docs/templates.md`
- Upload: skill `upload-templates`
