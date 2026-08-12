import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist", "client");
const basePath = "/sict-web";
const prefixedAssetsDir = path.join(outputDir, basePath.slice(1), "_next");
const prefixedCssDir = path.join(prefixedAssetsDir, "static", "css");
const legacyCssNames = ["index.BSPyRy4Z.css"];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  }));
  return files.flat();
}

function pagesHref(href) {
  if (!href.startsWith("/") || href.startsWith(`${basePath}/`)) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? href;
  const suffix = match?.[2] ?? "";
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const routePath = pathname === "/" || isFile || pathname.endsWith("/")
    ? pathname
    : `${pathname}/`;

  return `${basePath}${routePath}${suffix}`;
}

function rewriteInternalLinks(html) {
  return html.replace(/href="(\/[^" ]*)"/g, (_match, href) => `href="${pagesHref(href)}"`);
}

const htmlFiles = (await collectFiles(outputDir)).filter((file) => file.endsWith(".html"));
const generatedCssFiles = (await readdir(prefixedCssDir)).filter((file) => file.endsWith(".css"));

if (generatedCssFiles.length !== 1) {
  throw new Error(`Expected exactly one generated stylesheet, found ${generatedCssFiles.length}.`);
}

const generatedCssName = generatedCssFiles[0];
const generatedCssPath = path.join(prefixedCssDir, generatedCssName);
const stableCssName = "site.css";
const stableCssPath = path.join(prefixedCssDir, stableCssName);
const stableCssUrl = `${basePath}/_next/static/css/${stableCssName}?v=${generatedCssName}`;

await cp(generatedCssPath, stableCssPath);
for (const legacyCssName of legacyCssNames) {
  await cp(generatedCssPath, path.join(prefixedCssDir, legacyCssName));
}

// assetPrefix controls public URLs, while GitHub Pages mounts the artifact
// itself at /sict-web. Keep a copy at the artifact root to match that mount.
await cp(prefixedAssetsDir, path.join(outputDir, "_next"), { recursive: true });

for (const htmlFile of htmlFiles) {
  const relative = path.relative(outputDir, htmlFile);
  if (path.basename(htmlFile) === "index.html" || relative === "404.html") continue;

  const routeDirectory = path.join(outputDir, relative.slice(0, -".html".length));
  await mkdir(routeDirectory, { recursive: true });
  await cp(htmlFile, path.join(routeDirectory, "index.html"));
}

const deploymentFiles = (await collectFiles(outputDir)).filter((file) => /\.(?:html|rsc|json|js)$/.test(file));
const generatedCssUrl = `${basePath}/_next/static/css/${generatedCssName}`;

for (const deploymentFile of deploymentFiles) {
  const source = await readFile(deploymentFile, "utf8");
  const withStableCss = source.replaceAll(generatedCssUrl, stableCssUrl);
  const output = deploymentFile.endsWith(".html")
    ? rewriteInternalLinks(withStableCss)
    : withStableCss;
  if (output !== source) await writeFile(deploymentFile, output);
}

await writeFile(path.join(outputDir, ".nojekyll"), "");
console.log(`Prepared ${htmlFiles.length} HTML files with stable CSS for GitHub Pages at ${basePath}.`);
