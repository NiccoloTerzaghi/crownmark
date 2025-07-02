// lib/cli.js
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

/**
 * Print the contents of lib/help.txt to stdout.
 * Path is resolved absolutely, so it works regardless of where the process is started.
 */
export async function showHelp() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const helpPath = path.join(__dirname, "help.txt");
	try {
		const helpText = await fs.readFile(helpPath, "utf-8");
		console.log(helpText);
	} catch (err) {
		console.log("Help file not found.");
	}
}

/**
 * Write a default .crownmarkrc.json config file in the root directory.
 * Will not overwrite if file already exists.
 */
export async function initDefaultConfig(rootDir) {
	const configPath = path.join(rootDir, ".crownmarkrc.json");
	const defaultConfig = {
		extensions: [
			".js",
			".ts",
			".jsx",
			".tsx",
			".py",
			".sh",
			".rb",
			".go",
			".java",
			".kt",
			".c",
			".cpp",
			".h",
			".cs",
			".php",
			".dart",
			".css",
			".scss",
			".less",
			".html",
			".xml",
			".yml",
			".yaml",
			".md",
		],
		ignoreDirs: ["node_modules", ".git"],
		ignoreFiles: [],
	};
	try {
		// flag: "wx" means 'write, fail if exists'
		await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2), {
			flag: "wx",
		});
		console.log(".crownmarkrc.json created with default config.");
	} catch (err) {
		if (err.code === "EEXIST") {
			console.log(".crownmarkrc.json already exists. Aborted.");
		} else {
			console.error("Error creating config:", err);
		}
		process.exit(1);
	}
	process.exit(0);
}

/**
 * Reads .crownmarkrc.json from project root (if present) and parses it.
 * Returns an object: { extensions, ignoreDirs, ignoreFiles }
 * If not present or not readable, returns an empty object (default behavior).
 */
export async function loadUserConfig(rootDir) {
	const configPath = path.join(rootDir, ".crownmarkrc.json");
	try {
		const configText = await fs.readFile(configPath, "utf-8");
		const config = JSON.parse(configText);
		return config;
	} catch {
		return {};
	}
}

/**
 * Parses CLI arguments (process.argv).
 * If --help or -h is present, shows help and exits.
 * If --init-config is present, creates a default config and exits.
 * Otherwise, returns true (main process should continue).
 */
export async function handleCliArgs(rootDir) {
	const argv = process.argv.slice(2);
	if (argv.includes("--help") || argv.includes("-h")) {
		await showHelp();
		process.exit(0);
	}
	if (argv.includes("--init-config")) {
		await initDefaultConfig(rootDir);
		// exits after creating config
	}
	return true; // continue if not exited
}
