#!/usr/bin/env node
import { execSync } from "child_process";
import { cpSync, existsSync, readdirSync, readFileSync, rmSync } from "fs";

const projects = readdirSync(".");

for (const project of projects) {

    if (existsSync(`${project}/phasereditor2d.config.json`)) {

        console.log("Processing project", project);

        if (existsSync(`${project}/package.json`)) {
            continue;

            console.log("Found node project");

            const data = JSON.parse(readFileSync(`${project}/package.json`, "utf-8"));

            for (const lib of ["@phaserjs/editor-scripts-base", "@phaserjs/editor-scripts-quick"]) {

                if (data.dependencies[lib]) {

                    execSync(`npm install ${lib}@latest`, { cwd: project, stdio: "inherit" });
                }
            }

        } else {

            console.log("Found js project");

            const PHASEREDITOR5_HOME = process.env.PHASEREDITOR5_HOME;

            rmSync(`${project}/editor-scripts-base`, { recursive: true, force: true });

            const src = `${PHASEREDITOR5_HOME}/script-nodes/editor-scripts-base/browser`;
            const dst = `${project}/`;

            console.log("Copying", src, "to", dst);

            cpSync(src, dst, { recursive: true, force: true });
        }
    }
}