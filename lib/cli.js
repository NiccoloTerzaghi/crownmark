// lib/cli.js
import path from "path";
import { promises as fs } from "fs";

/**
 * Show the contents of lib/help.txt to stdout.
 */
export async function showHelp() {
	const helpPath = path.join(
		path.dirname(new URL(import.meta.url).pathname),
		"help.txt"
	);
	try {
		const resolvedPath = decodeURI(helpPath);
		const helpText = await fs.readFile(resolvedPath, "utf-8");
		console.log(helpText);
	} catch (err) {
		console.log("Help file not found.");
	}
}

/**
 * Parses process.argv and decides what to do.
 * If --help or -h, shows help and exits.
 * Otherwise returns true if should proceed, false if exited.
 */
export async function handleCliArgs() {
	const argv = process.argv.slice(2);
	if (argv.includes("--help") || argv.includes("-h")) {
		await showHelp();
		process.exit(0);
	}
	// Extend here with more CLI options if needed
	return true; // Continue if not exited
}
