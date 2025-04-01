#!/usr/bin/env node
import { createHash } from "crypto";
import { readdir, stat, readFile } from "fs/promises";
import { join } from "path";
import fs, { cpSync, existsSync, mkdirSync, rmSync, writeSync } from "fs";
import archiver from "archiver";

const STORAGE_URL= "https://example.com/";
const REPO_URL = "https://github.com/phaserjs/phaser-editor-v5-starter-templates";

const skipFolders = new Set([
    ".git",
    "node_modules",
]);

async function hashFile(filePath) {

    const content = await readFile(filePath);

    const hash = createHash("sha256").update(content).digest("hex");

    return hash;
}

async function hashFolder(folderPath) {

    const entries = await readdir(folderPath, { withFileTypes: true });

    const fileHashes = [];

    for (const entry of entries) {

        if (skipFolders.has(entry.name)) {

            continue;
        }

        const fullPath = join(folderPath, entry.name);
        const entryStat = await stat(fullPath);

        if (entryStat.isDirectory()) {

            const subfolderHash = await hashFolder(fullPath);
            fileHashes.push(subfolderHash);

        } else if (entryStat.isFile()) {

            const fileHash = await hashFile(fullPath);
            const hashWithPath = createHash("sha256")
                .update(entry.name + ":" + fileHash)
                .digest("hex");

            fileHashes.push(hashWithPath);
        }
    }

    fileHashes.sort();

    return createHash("sha256")
        .update(fileHashes.join("|"))
        .digest("hex");
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

    console.log("Hashing files...");

    const hash = await hashFolder(projectName);

    const isExample = projectName.includes("-example-");
    const siteName = isExample ? "examples" : "starters";

    const templateJSON = JSON.parse(await readFile(`${projectName}/template.json`, "utf8"));

    const templateData = {
        ...templateJSON,
        image: `screenshots/${projectName}.png`,
        website: `${REPO_URL}/tree/main/${projectName}`,
        zip_url: `${STORAGE_URL}/${siteName}/files/${projectName}-${hash}.zip`,
        name: projectName
    };

    (isExample ? examplesData : startersData).push(templateData);
    
    // copy template.png

    cpSync(`${projectName}/template.png`, `build/${siteName}/screenshots/${projectName}.png`);

    console.log(`Zipping files...`);

    // await zipFolder("editor-example-a-day-in-the-beach", `build/${projectName}-${hash}.zip`);
}


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


