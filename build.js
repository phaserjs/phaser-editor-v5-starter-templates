#!/usr/bin/env node
import { readdir, stat, readFile } from "fs/promises";
import path from "path";
import fs, { cpSync, existsSync, glob, globSync, mkdirSync, rmSync, statSync, writeSync } from "fs";
import archiver from "archiver";
import ignore from "ignore";
import fg from "fast-glob";
import dotenv from "dotenv";

dotenv.config();

const STORAGE_URL = process.env.PHASER_EDITOR_V5_TEMPLATES_URL;

const REPO_URL = "https://github.com/phaserjs/phaser-editor-v5-starter-templates";

// computing the ignore rules
const baseDir = process.cwd();

const gitignoreFiles = await fg("**/.gitignore", { cwd: baseDir, absolute: true });

const ignoreRules = [];

for (const file of gitignoreFiles) {

    const relDir = path.dirname(path.relative(baseDir, file));
    const content = fs.readFileSync(file, "utf8");
    const ig = ignore().add(content);

    ignoreRules.push({
        base: path.join(baseDir, relDir),
        ig
    });
}

function shouldIgnore(filePath) {

    for (const { base, ig } of ignoreRules) {

        const relativeToBase = path.relative(base, filePath);

        if (relativeToBase !== "" && !relativeToBase.startsWith("..") && !path.isAbsolute(relativeToBase)) {

            if (ig.ignores(relativeToBase)) {

                return true;
            }
        }
    }

    return false;
}

async function zipFolder(sourceFolder, outputZipPath) {

    return new Promise((resolve, reject) => {

        const output = fs.createWriteStream(outputZipPath);

        const archive = archiver("zip", { zlib: { level: 9 } });

        output.on("close", () => {
            console.log(`Created ${outputZipPath} (${archive.pointer()} bytes)`);
            resolve();
        });

        archive.on("error", err => reject(err));

        archive.pipe(output);
        archive.directory(sourceFolder, false);
        archive.finalize();
    });
}

console.log("\nCleaning build folder...\n");

rmSync("build/", { recursive: true, force: true });

[
    "build",
    "build/examples/files",
    "build/starters/files",
    "build/examples/screenshots",
    "build/starters/screenshots",

].forEach(d => mkdirSync(d, { recursive: true }));

const projectNames = (await readdir(".")).filter((name) => name.startsWith("editor-") && existsSync(`${name}/template.json`));

const examplesData = [];
const startersData = [];

for (const projectName of projectNames) {

    console.log(`\nProcessing '${projectName}'...\n`);

    // build metadata

    const isExample = projectName.includes("-example-");
    const siteName = isExample ? "examples" : "starters";

    const templateJSON = JSON.parse(await readFile(`${projectName}/template.json`, "utf8"));

    const projectVersion = templateJSON.version;

    const templateData = {
        ...templateJSON,
        image: `screenshots/${projectName}.png`,
        website: `${REPO_URL}/tree/main/${projectName}`,
        zip_url: `${STORAGE_URL}/${siteName}/files/${projectName}-${projectVersion}.zip`,
        name: projectName
    };

    (isExample ? examplesData : startersData).push(templateData);

    // copy template.png

    cpSync(`${projectName}/template.png`, `build/${siteName}/screenshots/${projectName}.png`);

    console.log(`Zipping files...`);

    let countIgnored = 0;

    cpSync(projectName, `build/${projectName}`, {
        recursive: true,
        filter: (src) => {

            const absPath = path.resolve(src);
            const ignoreIt = shouldIgnore(absPath);

            countIgnored += ignoreIt ? 1 : 0;

            return !ignoreIt;
        }
    });

    await zipFolder(`build/${projectName}`, `build/${siteName}/files/${projectName}-${projectVersion}.zip`);

    rmSync(`build/${projectName}`, { recursive: true, force: true });

    console.log(`Ignored ${countIgnored} files`);
}

// write metadata

writeSync(
    fs.openSync("build/examples/templates.json", "w"),
    JSON.stringify(examplesData, null, 4)
);

writeSync(
    fs.openSync("build/starters/templates.json", "w"),
    JSON.stringify(startersData, null, 4)
);

console.log("Copying Phaser template files...");

fs.cpSync("phaser-site", `build/phaser`, { recursive: true });


