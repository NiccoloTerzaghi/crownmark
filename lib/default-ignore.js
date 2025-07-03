// lib/default-ignore.js

/**
 * Default ignore patterns for crownmark.
 * Covers common generated, build, cache, editor, and temp files for major languages.
 */
export const defaultIgnore = [
  // Node & Frontend
  "node_modules/",
  "bower_components/",
  "dist/",
  "build/",
  "out/",
  "coverage/",
  "logs/",
  "*.log",
  "*.tmp",
  ".parcel-cache/",
  ".cache/",
  ".next/",
  ".nuxt/",
  ".output/",
  ".yarn/",
  "npm-debug.log*",
  "yarn-debug.log*",
  "yarn-error.log*",
  ".eslintcache",
  ".prettier*",
  ".sass-cache/",

  // Version control & Editor
  ".git/",
  ".hg/",
  ".svn/",
  ".DS_Store",
  ".vscode/",
  ".idea/",
  ".c9/",
  ".history/",
  ".expo/",
  ".Trash-*",

  // Python
  "venv/",
  ".venv/",
  "env/",
  "ENV/",
  ".env/",
  "__pycache__/",
  "*.pyc",
  "*.pyo",
  ".mypy_cache/",
  "pip-wheel-metadata/",
  ".pytest_cache/",
  ".coverage",
  ".nyc_output/",
  "__pypackages__/",

  // Java, Rust, C/C++
  "target/",
  "bin/",
  "obj/",
  ".gradle/",
  ".classpath",
  ".project",
  ".settings/",
  ".metadata/",

  // Temp files & swap
  ".tmp/",
  "tmp/",
  "*.swp",
  "*.swo",
];
