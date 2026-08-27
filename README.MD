## Phaser Editor v5 templates

Official starter and example templates for Phaser Editor v5.

Run `build.js` to create the `build/` folder with the templates metadata and zips.

The environment variable `PHASER_EDITOR_V5_TEMPLATES_URL` should contain the url of the templates site. You can add this var to a `.env` file in the root of the project. For example:

```bash
PHASER_EDITOR_V5_TEMPLATES_URL=https://mywebsite.com/templates
```

## Update Phaser

Prefer `./update-phaser-all.sh` (skill `update-templates-phaser`): pins `phaser` in every template and increments marketplace `template.json` versions.

Or by hand: `./update-phaser.js` then `./increment-version-all-projects.js`.

And build the metadata and zip files again, then upload:

```
./publish-templates.sh --check
./publish-templates.sh --dry-run
./publish-templates.sh
```

Agent skills (also catalogued from the Editor repo `developer-docs/skills.md`):

- `update-templates-phaser` → `./update-phaser-all.sh`
- `upload-templates` → `./publish-templates.sh`