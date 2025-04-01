#!/usr/bin/env node
import { createHash } from "crypto";
import { readdir, stat, readFile, mkdir } from "fs/promises";
import { join } from "path";
import fs from "fs";
import archiver from "archiver";
import { rm } from "fs/promises";
import { exit } from "process";

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

await rm("build/", { recursive: true, force: true });
await mkdir("build/");

const projectNames = (await readdir(".")).filter((name) => name.startsWith("editor-"));

for (const projectName of projectNames) {

    console.log(`\nProcessing '${projectName}'...\n`);

    console.log("Hashing files...");

    const hash = await hashFolder(projectName);

    console.log(`Zipping files...`);

    await zipFolder("editor-example-a-day-in-the-beach", `build/${projectName}-${hash}.zip`);
}
