#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { exit } from "process";

const phaserVersion = JSON.parse(fs.readFileSync(path.join(process.env.PHASER_PATH, "phaser", "package.json"), "utf8")).version;

console.log("Phaser version:", phaserVersion);

const currentDir = process.cwd();

const items = fs.readdirSync(currentDir, { withFileTypes: true });

const nodeProjects = items
    .filter(item => item.isDirectory())
    .map(dir => path.join(currentDir, dir.name))
    .filter(folder => fs.existsSync(path.join(folder, "package.json"))
        && fs.existsSync(path.join(folder, "phasereditor2d.config.json")));

const jsProjects = items
    .filter(item => item.isDirectory())
    .map(dir => path.join(currentDir, dir.name))
    .filter(folder => !fs.existsSync(path.join(folder, "package.json"))
        && fs.existsSync(path.join(folder, "phasereditor2d.config.json")));

for (const project of jsProjects) {

    updateJSProject(project);
}

for (const project of nodeProjects) {

    updateNodeProject(project);
}

function updateNodeProject(project) {

    console.log(`Updating node project: ${project}`);

    execSync(`npm install phaser@${phaserVersion}`, { cwd: project });

    console.log(`Updated package.json`);
}

function updateJSProject(project) {

    console.log(`Updating simple JS project: ${project}`);

    console.log(`Updating index.html`);

    const indexFile = path.join(project, "index.html");

    const str = fs.readFileSync(indexFile, "utf8").trim();

    let newStr = "";

    for (let line of str.split("\n")) {

        if (line.includes("phaser.min.js")) {

            line = `    <script src="https://cdn.jsdelivr.net/npm/phaser@v${phaserVersion}/dist/phaser.min.js"></script>`
        }

        newStr += line + "\n";
    }

    fs.writeFileSync(indexFile, newStr);

    console.log(`Copying type defs...`);

    fs.copyFileSync(path.join(process.env.PHASER_PATH, "phaser", "types", "phaser.d.ts"), path.join(project, "types", "phaser.d.ts"));
    fs.copyFileSync(path.join(process.env.PHASER_PATH, "phaser", "types", "matter.d.ts"), path.join(project, "types", "matter.d.ts"));
}
