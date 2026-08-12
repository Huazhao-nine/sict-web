import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist", "client");
const basePath = "/sict-web";
const prefixedAssetsDir = path.join(outputDir, basePath.slice(1), "_next");

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

// assetPrefix controls public URLs, while GitHub Pages mounts the artifact
// itself at /sict-web. Keep a copy at the artifact root to match that mount.
await cp(prefixedAssetsDir, path.join(outputDir, "_next"), { recursive: true });

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  await writeFile(htmlFile, rewriteInternalLinks(html));

  const relative = path.relative(outputDir, htmlFile);
  if (path.basename(htmlFile) === "index.html" || relative === "404.html") continue;

  const routeDirectory = path.join(outputDir, relative.slice(0, -".html".length));
  await mkdir(routeDirectory, { recursive: true });
  await cp(htmlFile, path.join(routeDirectory, "index.html"));
}

await writeFile(path.join(outputDir, ".nojekyll"), "");
console.log(`Prepared ${htmlFiles.length} HTML files for GitHub Pages at ${basePath}.`);
