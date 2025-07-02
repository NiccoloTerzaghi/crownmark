#!/usr/bin/env node
// index.js
import { handleCliArgs } from "./lib/cli.js";
import { promises as fs } from "fs";
import path from "path";

const ROOT_DIR = process.cwd();

// Call CLI args parser/handler. If it exits, the process ends here.
await handleCliArgs();

// This object maps file extensions to the proper comment syntax
// so the header is correctly formatted for each language.
const COMMENT_STYLES = {
	".js": (p) => `// ${p}`,
	".ts": (p) => `// ${p}`,
	".jsx": (p) => `// ${p}`,
	".tsx": (p) => `// ${p}`,
	".py": (p) => `# ${p}`,
	".sh": (p) => `# ${p}`,
	".rb": (p) => `# ${p}`,
	".go": (p) => `// ${p}`,
	".java": (p) => `// ${p}`,
	".kt": (p) => `// ${p}`,
	".c": (p) => `// ${p}`,
	".cpp": (p) => `// ${p}`,
	".h": (p) => `// ${p}`,
	".cs": (p) => `// ${p}`,
	".php": (p) => `// ${p}`,
	".dart": (p) => `// ${p}`,
	".css": (p) => `/* ${p} */`,
	".scss": (p) => `/* ${p} */`,
	".less": (p) => `/* ${p} */`,
	".html": (p) => `<!-- ${p} -->`,
	".xml": (p) => `<!-- ${p} -->`,
	".yml": (p) => `# ${p}`,
	".yaml": (p) => `# ${p}`,
	".md": (p) => `<!-- ${p} -->`,
};

// These keywords indicate special comments that should always stay at the top.
const SPECIAL_COMMENT_KEYWORDS = [
	"@license",
	"@preserve",
	"@copyright",
	"eslint",
	"prettier",
	"tslint",
	"jshint",
];

// Builds the header comment string based on the file extension and its relative path.
function getCommentForFile(filePath) {
	const ext = path.extname(filePath).toLowerCase();
	const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
	const commentFn = COMMENT_STYLES[ext];
	return commentFn ? `${commentFn(relativePath)}\n` : null;
}

// Determines where the header should be inserted:
// - after a shebang line if present
// - after special comments that should stay at the top
function findInsertionIndex(lines) {
	let index = 0;
	if (lines[0]?.startsWith("#!")) {
		index = 1;
	}
	while (index < lines.length) {
		const line = lines[index].trim();
		if (
			line.startsWith("//") ||
			line.startsWith("#") ||
			line.startsWith("/*") ||
			line.startsWith("<!--")
		) {
			if (
				SPECIAL_COMMENT_KEYWORDS.some((keyword) =>
					line.includes(keyword)
				)
			) {
				index++;
				continue;
			}
		}
		break;
	}
	return index;
}

// Inserts or updates the header comment into the file.
// If an existing header is found with a different path, it replaces it.
async function addHeaderToFile(filePath) {
	const comment = getCommentForFile(filePath);
	if (!comment) return;

	const content = await fs.readFile(filePath, "utf-8");
	const lines = content.split("\n");

	const insertionIndex = findInsertionIndex(lines);

	// Check if there's already a header exactly at insertion point
	if (lines[insertionIndex]?.trim().startsWith(comment.trim().slice(0, 2))) {
		// Compare actual content to see if path matches
		if (lines[insertionIndex].trim() === comment.trim()) {
			console.log(
				`Skipping ${filePath} (correct header already present)`
			);
			return;
		} else {
			// Update the header to the correct path
			lines[insertionIndex] = comment.trim();
			console.log(`Updated header in ${filePath} (path corrected)`);
		}
	} else {
		// Insert the header
		lines.splice(insertionIndex, 0, comment.trim());
		console.log(`Added header to ${filePath}`);
	}

	const newContent = lines.join("\n");
	await fs.writeFile(filePath, newContent, "utf-8");
}

// Recursively processes all files in the directory tree.
async function walkDir(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walkDir(fullPath);
		} else if (entry.isFile()) {
			await addHeaderToFile(fullPath);
		}
	}
}

// Starts the entire header insertion or correction process.
(async () => {
	try {
		await walkDir(ROOT_DIR);
		console.log("Done adding/updating headers.");
	} catch (err) {
		console.error("Error:", err);
	}
})();
