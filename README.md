<!-- README.md -->
# crownmark
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

> CLI tool to automatically insert header comments showing the file path in your source files, supporting many programming languages.

---

## ✨ Features

✅ Adds a clean header comment with the relative file path to each source file.
✅ Supports multiple programming languages (JavaScript, TypeScript, Python, Shell, C/C++, Java, HTML, CSS, YAML, Markdown, etc.).
✅ Preserves shebangs and important license or linter comments at the top of your files.
✅ Updates the header if the file moves, ensuring the path is always correct.

---

## 🚀 Installation

Install it globally:

```bash
npm install -g crownmark
```

Or add it to your project:

```bash
npm install crownmark
```

---

## ⚡ Usage

Run it from your project root:

```bash
crownmark
```

It will recursively scan your project folder and:

* Insert a header like `// src/utils/myfile.js` at the top of each file (using the correct comment style).
* Skip files that already have the correct header.
* Update the header if the file was renamed or moved.
* Honor your custom config for included extensions and ignore rules.

---

## 🔧 Example output

For a `utils/helper.js` file, it would add:

```js
// utils/helper.js
export function greet(name) {
	return `Hello, ${name}!`;
}
```

---

## 🛠 Supported file types

* `.js`, `.ts`, `.jsx`, `.tsx`
* `.py`, `.sh`, `.rb`, `.go`, `.java`, `.kt`, `.c`, `.cpp`, `.h`, `.cs`, `.php`, `.dart`
* `.css`, `.scss`, `.less`
* `.html`, `.xml`
* `.yml`, `.yaml`
* `.md`

---

## ⚙️ Custom configuration

You can control which file extensions and folders/files are included or ignored by creating a `.crownmarkrc.json` in your project root.

### Example config

```json
{
	"extensions": [".js", ".ts", ".dart"],
	"ignore": [
		"node_modules/",
		".git/",
		"dist/",
		"custom.ignore.js",
		"!src/do-not-ignore.js"
	]
}
```

* **extensions**: Only these file types will be processed (default: all supported extensions)
* **ignore**: Array of ignore rules using [`.gitignore`-style patterns](https://git-scm.com/docs/gitignore). Ignored files or folders will be skipped.

You can auto-generate a default config file with:

```bash
crownmark --init-config
```

This creates a `.crownmarkrc.json` in your project root with all supported extensions and standard ignore rules.

---

## 📝 Command line options

* `--help`, `-h`   Show help and usage
* `--init-config`   Create a default `.crownmarkrc.json` config file in your project root

---

## 📁 Default ignored folders and files

By default, crownmark will always skip common build, cache, environment, and version control folders (such as `node_modules`, `.git`, `dist`, `venv`, etc.), even if you don't provide a `.crownmarkrc.json`.

You can find the full list of default ignored patterns in [`lib/default-ignore.js`](./lib/default-ignore.js) in the source code.

If you want to override or extend these, simply use the `"ignore"` array in your config file.

---

## 🙋 FAQ

**How are ignored files/folders handled?**
The `ignore` array in your config uses the same syntax as `.gitignore`, so you can use wildcards, negation (`!`), and directory/file matching.

**Does it change license or linter comments?**
No, any special comments (license, linter, preserve, etc.) are left at the top, before the header.

---

## 👤 Author

Niccolò Terzaghi ([github.com/NiccoloTerzaghi](https://github.com/NiccoloTerzaghi))
