// Builds the deployed assets in docs/ from sources:
//   src/css/styles.css  ->  docs/css/styles.css   (plus a Font Awesome subset, purged and minified)
//   Font Awesome fonts  ->  docs/webfonts/*.woff2 (only the glyphs the site uses)
//
// Run with `npm run build` after changing src/css/styles.css, docs/index.html
// or any icon class in docs/js/*.js.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PurgeCSS } from "purgecss";
import { minify } from "csso";
import subsetFont from "subset-font";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const faDir = path.dirname(require.resolve("@fortawesome/fontawesome-free/package.json"));

// Files whose markup or strings decide which selectors and icons are kept.
const contentFiles = [
  path.join(docs, "index.html"),
  ...(await readdir(path.join(docs, "js"))).filter((f) => f.endsWith(".js")).map((f) => path.join(docs, "js", f)),
  path.join(docs, "assets", "JQwcloud.js"),
];
const content = (await Promise.all(contentFiles.map((f) => readFile(f, "utf8")))).join("\n");

// ---- Font Awesome subset ---------------------------------------------------
const faCss = await readFile(path.join(faDir, "css", "all.css"), "utf8");
const codepoints = new Map(); // icon name -> codepoint
for (const m of faCss.matchAll(/\.fa-([a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-f]+)";/g)) {
  codepoints.set(m[1], m[2]);
}
const used = [...new Set([...content.matchAll(/\bfa-([a-z0-9-]+)/g)].map((m) => m[1]))]
  .filter((name) => codepoints.has(name))
  .sort();
const text = used.map((name) => String.fromCodePoint(parseInt(codepoints.get(name), 16))).join("");

await mkdir(path.join(docs, "webfonts"), { recursive: true });
for (const font of ["fa-solid-900", "fa-brands-400"]) {
  const source = await readFile(path.join(faDir, "webfonts", `${font}.woff2`));
  const subset = await subsetFont(source, text, { targetFormat: "woff2" });
  await writeFile(path.join(docs, "webfonts", `${font}.woff2`), subset);
  console.log(`webfonts/${font}.woff2: ${source.length} -> ${subset.length} bytes`);
}

const iconCss = `
@font-face{font-family:"Font Awesome 5 Free";font-style:normal;font-weight:900;font-display:block;src:url(../webfonts/fa-solid-900.woff2) format("woff2")}
@font-face{font-family:"Font Awesome 5 Brands";font-style:normal;font-weight:400;font-display:block;src:url(../webfonts/fa-brands-400.woff2) format("woff2")}
.fa,.fas,.fab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1}
.fa,.fas{font-family:"Font Awesome 5 Free";font-weight:900}
.fab{font-family:"Font Awesome 5 Brands";font-weight:400}
${used.map((name) => `.fa-${name}:before{content:"\\${codepoints.get(name)}"}`).join("\n")}
`;
console.log(`icons: ${used.length} (${used.join(", ")})`);

// ---- Stylesheet ---------------------------------------------------------------
const source = (await readFile(path.join(root, "src", "css", "styles.css"), "utf8")) + iconCss;
const [purged] = await new PurgeCSS().purge({
  content: [{ raw: content, extension: "html" }],
  css: [{ raw: source }],
  // Classes toggled at runtime by Bootstrap's collapse/scrollspy plugins.
  safelist: { standard: ["show", "collapsing", "collapsed", "active"] },
  dynamicAttributes: ["cloud"],
  keyframes: true,
});
const { css } = minify(purged.css, { comments: "exclamation" });
await writeFile(path.join(docs, "css", "styles.css"), css + "\n");
console.log(`css/styles.css: ${Buffer.byteLength(source)} -> ${Buffer.byteLength(css)} bytes`);
