// lib/header.js
import path from "path";
import { promises as fs } from "fs";

/**
 * Maps file extensions to comment syntax for each language.
 */
export const COMMENT_STYLES = {
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

/**
 * List of keywords that indicate special comments that should stay at the top of a file.
 */
export const SPECIAL_COMMENT_KEYWORDS = [
  "@license",
  "@preserve",
  "@copyright",
  "eslint",
  "prettier",
  "tslint",
  "jshint",
];

/**
 * Builds the header comment string based on the file extension and its relative path.
 */
export function getCommentForFile(filePath, rootDir) {
  const ext = path.extname(filePath).toLowerCase();
  const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const commentFn = COMMENT_STYLES[ext];
  return commentFn ? `${commentFn(relativePath)}\n` : null;
}

/**
 * Determines where the header should be inserted:
 * - after a shebang line if present
 * - after special comments that should stay at the top
 */
export function findInsertionIndex(lines) {
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
      if (SPECIAL_COMMENT_KEYWORDS.some((keyword) => line.includes(keyword))) {
        index++;
        continue;
      }
    }
    break;
  }
  return index;
}

/**
 * Inserts or updates the header comment into the file.
 * If an existing header is found with a different path, it replaces it.
 */
export async function addHeaderToFile(filePath, rootDir) {
  const comment = getCommentForFile(filePath, rootDir);
  if (!comment) return;

  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n");

  const insertionIndex = findInsertionIndex(lines);

  // Check if there's already a header exactly at insertion point
  if (lines[insertionIndex]?.trim().startsWith(comment.trim().slice(0, 2))) {
    // Compare actual content to see if path matches
    if (lines[insertionIndex].trim() === comment.trim()) {
      console.log(`⏭️  Skipping ${filePath} (correct header already present)`);
      return;
    } else {
      // Update the header to the correct path
      lines[insertionIndex] = comment.trim();
      console.log(`✏️  Updated header in ${filePath} (path corrected)`);
    }
  } else {
    // Insert the header
    lines.splice(insertionIndex, 0, comment.trim());
    console.log(`🆕 Added header to ${filePath}`);
  }

  const newContent = lines.join("\n");
  await fs.writeFile(filePath, newContent, "utf-8");
}
