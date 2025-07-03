// lib/walker.js
import path from "path";
import { promises as fs } from "fs";
import ignore from "ignore";
import { addHeaderToFile, COMMENT_STYLES } from "./header.js";
import { defaultIgnore } from "./default-ignore.js";

/**
 * Returns true if the file extension is enabled for processing.
 */
function isAllowedExtension(filePath, userConfig) {
  if (userConfig.extensions && userConfig.extensions.length) {
    return userConfig.extensions.includes(path.extname(filePath).toLowerCase());
  }
  return Object.keys(COMMENT_STYLES).includes(
    path.extname(filePath).toLowerCase()
  );
}

/**
 * Recursively processes all files in the directory tree, respecting user config for ignores/extensions.
 * Uses the ignore package for matching files and folders.
 * Always applies a set of default ignore rules even without a config file.
 */
export async function walkDir(rootDir, userConfig) {
  const IGNORE = ignore();
  if (userConfig.ignore && Array.isArray(userConfig.ignore)) {
    IGNORE.add(defaultIgnore.concat(userConfig.ignore));
  } else {
    IGNORE.add(defaultIgnore);
  }

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, "/");

      // Ignore files/directories according to ignore rules
      if (IGNORE.ignores(relativePath)) continue;

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        if (!isAllowedExtension(fullPath, userConfig)) continue; // skip unwanted extensions
        await addHeaderToFile(fullPath, rootDir);
      }
    }
  }

  await walk(rootDir);
}
