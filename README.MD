## Phaser Editor v5 templates

Official starter and example templates for Phaser Editor v5.

Run `build.js` to create the `build/` folder with the templates metadata and zips.

The environment variable `PHASER_EDITOR_V5_TEMPLATES_URL` should contain the url of the templates site. You can add this var to a `.env` file in the root of the project. For example:

```bash
PHASER_EDITOR_V5_TEMPLATES_URL=https://mywebsite.com/templates
```

## Update Phaser

You can run the script `./update-phaser.js` to update the Phaser version in all templates.

Since you updated the Phaser version, you need to increment the version of each template:

`./increment-version-all-projects.js`

And build the metadata a and zip files again:

`./build.js`