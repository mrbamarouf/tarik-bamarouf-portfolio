import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const configPath = path.join(rootDir, ".vercel", "output", "config.json");

const sitemapHeadersRoute = {
  src: "/sitemap\\.xml",
  headers: {
    "content-type": "application/xml; charset=utf-8",
    "x-content-type-options": "nosniff",
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  },
};

const config = JSON.parse(await readFile(configPath, "utf8"));
const routes = Array.isArray(config.routes) ? config.routes : [];
const routesWithoutSitemap = routes.filter(
  (route) => route?.src !== sitemapHeadersRoute.src,
);
const filesystemIndex = routesWithoutSitemap.findIndex(
  (route) => route?.handle === "filesystem",
);

if (filesystemIndex === -1) {
  config.routes = [sitemapHeadersRoute, ...routesWithoutSitemap];
} else {
  config.routes = [
    ...routesWithoutSitemap.slice(0, filesystemIndex),
    sitemapHeadersRoute,
    ...routesWithoutSitemap.slice(filesystemIndex),
  ];
}

await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);

console.log("Finalized Vercel output headers for sitemap.xml.");
