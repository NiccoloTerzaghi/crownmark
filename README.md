<!-- README.md -->

# crownmark

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

-   Insert a header like `// src/utils/myfile.js` at the top of each file (using the correct comment style).
-   Skip files that already have the correct header.
-   Update the header if the file was renamed or moved.

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

-   `.js`, `.ts`, `.jsx`, `.tsx`
-   `.py`, `.sh`, `.rb`, `.go`, `.java`, `.kt`, `.c`, `.cpp`, `.h`, `.cs`, `.php`
-   `.css`, `.scss`, `.less`
-   `.html`, `.xml`
-   `.yml`, `.yaml`
-   `.md`
