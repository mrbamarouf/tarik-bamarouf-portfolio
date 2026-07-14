import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const configPath = path.join(rootDir, ".vercel", "output", "config.json");
const buildVersionPath = path.join(rootDir, ".vercel", "output", "static", "build-version.json");

const sitemapHeadersRoute = {
  src: "/sitemap\\.xml",
  headers: {
    "content-type": "application/xml; charset=utf-8",
    "x-content-type-options": "nosniff",
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  },
};

const buildVersionHeadersRoute = {
  src: "/build-version\\.json",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff",
    "cache-control": "public, max-age=0, must-revalidate",
  },
};

function getBuildVersion() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  if (process.env.SOURCE_VERSION) return process.env.SOURCE_VERSION;

  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return "dev";
  }
}

const buildVersion = getBuildVersion();
const config = JSON.parse(await readFile(configPath, "utf8"));
const routes = Array.isArray(config.routes) ? config.routes : [];
const headerRoutes = [sitemapHeadersRoute, buildVersionHeadersRoute];
const headerRouteSources = new Set(headerRoutes.map((route) => route.src));
const routesWithoutManagedHeaders = routes.filter((route) => !headerRouteSources.has(route?.src));
const filesystemIndex = routesWithoutManagedHeaders.findIndex(
  (route) => route?.handle === "filesystem",
);

if (filesystemIndex === -1) {
  config.routes = [...headerRoutes, ...routesWithoutManagedHeaders];
} else {
  config.routes = [
    ...routesWithoutManagedHeaders.slice(0, filesystemIndex),
    ...headerRoutes,
    ...routesWithoutManagedHeaders.slice(filesystemIndex),
  ];
}

await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
await writeFile(
  buildVersionPath,
  `${JSON.stringify(
    {
      version: buildVersion,
      commit: buildVersion,
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  )}\n`,
);

console.log("Finalized Vercel output headers and build version.");
