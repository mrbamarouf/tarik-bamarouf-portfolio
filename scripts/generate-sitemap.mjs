import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const projectsFile = path.join(rootDir, "src", "lib", "portfolio-projects.ts");

const SITE_URL = "https://tarikbamarouf.com";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeUrl(routePath) {
  return new URL(routePath, SITE_URL).toString();
}

function getProjectSlugs(source) {
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

const projectsSource = await readFile(projectsFile, "utf8");
const projectRoutes = getProjectSlugs(projectsSource).map((slug) => ({
  path: `/work/${slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const routes = [...staticRoutes, ...projectRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(normalizeUrl(route.path))}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, "sitemap.xml"), sitemap);
await writeFile(path.join(publicDir, "robots.txt"), robots);

console.log(`Generated sitemap.xml with ${routes.length} URLs.`);
