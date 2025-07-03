// lib/cli.js
import { handleCliArgs, loadUserConfig } from "./config.js";
import { walkDir } from "./walker.js";

/**
 * CLI bootstrap.
 * Handles CLI args, loads config, and starts processing files.
 */
export async function runCli() {
  const ROOT_DIR = process.cwd();

  // Handle CLI arguments (help, init-config) and exit if needed
  await handleCliArgs(ROOT_DIR);

  // Load user config
  const USER_CONFIG = await loadUserConfig(ROOT_DIR);

  // Start header insertion/update process
  try {
    await walkDir(ROOT_DIR, USER_CONFIG);
    console.log("✅ All done! Header comments are up to date.");
  } catch (err) {
    console.error("❌ Error while updating headers: ", err);
  }
}
