#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, readdirSync, readFileSync } from "fs";

const projects = readdirSync(".");

// Webpack related packages to update
const webpackPackages = [
    "webpack",
    "webpack-cli",
    "webpack-dev-server",
    "clean-webpack-plugin",
    "copy-webpack-plugin",
    "html-webpack-plugin",
    "webpack-clean-plugin"
];

// Vite related packages to update
const vitePackages = [
    "vite"
];

const results = [];

for (const project of projects) {

    if (existsSync(`${project}/phasereditor2d.config.json`)) {

        console.log("\n" + "=".repeat(60));
        console.log(`Processing project: ${project}`);
        console.log("=".repeat(60));

        if (existsSync(`${project}/package.json`)) {

            console.log("Found node project");

            const data = JSON.parse(readFileSync(`${project}/package.json`, "utf-8"));

            const allDeps = {
                ...data.dependencies,
                ...data.devDependencies
            };

            let bundlerType = null;
            let updateSuccess = true;

            // Check if project uses Webpack
            const hasWebpack = webpackPackages.some(pkg => allDeps[pkg]);

            if (hasWebpack) {
                bundlerType = "webpack";
                console.log("Detected Webpack project");

                for (const pkg of webpackPackages) {
                    if (allDeps[pkg]) {
                        console.log(`  Updating ${pkg} to latest...`);
                        try {
                            execSync(`npm install ${pkg}@latest`, { 
                                cwd: project, 
                                stdio: "inherit" 
                            });
                        } catch (error) {
                            console.error(`  Failed to update ${pkg}:`, error.message);
                            updateSuccess = false;
                        }
                    }
                }
            }

            // Check if project uses Vite
            const hasVite = vitePackages.some(pkg => allDeps[pkg]);

            if (hasVite) {
                bundlerType = "vite";
                console.log("Detected Vite project");

                for (const pkg of vitePackages) {
                    if (allDeps[pkg]) {
                        console.log(`  Updating ${pkg} to latest...`);
                        try {
                            execSync(`npm install ${pkg}@latest`, { 
                                cwd: project, 
                                stdio: "inherit" 
                            });
                        } catch (error) {
                            console.error(`  Failed to update ${pkg}:`, error.message);
                            updateSuccess = false;
                        }
                    }
                }
            }

            if (!hasWebpack && !hasVite) {
                console.log("  No web bundler detected, skipping...");
                continue;
            }

            // Test the build
            if (updateSuccess && bundlerType) {
                console.log("\n" + "-".repeat(60));
                console.log("Testing build...");
                console.log("-".repeat(60));
                
                try {
                    execSync("npm run build", {
                        cwd: project,
                        stdio: "inherit"
                    });
                    console.log("\n✓ Build test PASSED");
                    results.push({
                        project,
                        bundler: bundlerType,
                        status: "✓ PASSED"
                    });
                } catch (error) {
                    console.error("\n✗ Build test FAILED");
                    results.push({
                        project,
                        bundler: bundlerType,
                        status: "✗ FAILED"
                    });
                }
            } else {
                results.push({
                    project,
                    bundler: bundlerType,
                    status: "⚠ UPDATE FAILED"
                });
            }
        }
    }
}

// Print summary
console.log("\n" + "=".repeat(60));
console.log("SUMMARY");
console.log("=".repeat(60));

if (results.length === 0) {
    console.log("No projects with web bundlers found.");
} else {
    for (const result of results) {
        console.log(`${result.status} - ${result.project} (${result.bundler})`);
    }
}

console.log("\nWeb bundler update complete!");
