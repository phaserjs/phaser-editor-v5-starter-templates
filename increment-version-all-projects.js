#!/usr/bin/env node
import fs, { existsSync, readdirSync } from "fs";

const projects = readdirSync(".");

for (const project of projects) {

    const templateFile = `${project}/template.json`;

    if (existsSync(templateFile)) {

        const template = JSON.parse(fs.readFileSync(templateFile, "utf8"));

        template.version += 1;

        fs.writeFileSync(templateFile, JSON.stringify(template, null, 4), "utf8");
    }
}