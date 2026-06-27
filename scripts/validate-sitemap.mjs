import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const SITE_URL = "https://tarikbamarouf.com/";
const changefreqValues = new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);

function fail(message) {
  console.error(`Invalid sitemap.xml: ${message}`);
  process.exit(1);
}

function readTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1]?.trim();
}

const xml = await readFile(sitemapPath, "utf8");

if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')) {
  fail("missing XML declaration");
}

if (
  !xml.includes(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  )
) {
  fail("missing sitemap namespace");
}

if (!xml.trimEnd().endsWith("</urlset>")) {
  fail("missing closing urlset tag");
}

const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => match[1],
);

if (urlBlocks.length === 0) {
  fail("no url entries found");
}

const seen = new Set();

for (const block of urlBlocks) {
  const loc = readTag(block, "loc");
  const lastmod = readTag(block, "lastmod");
  const changefreq = readTag(block, "changefreq");
  const priority = readTag(block, "priority");

  if (!loc) fail("url entry is missing loc");
  if (!lastmod) fail(`${loc} is missing lastmod`);
  if (!changefreq) fail(`${loc} is missing changefreq`);
  if (!priority) fail(`${loc} is missing priority`);

  if (!loc.startsWith(SITE_URL)) {
    fail(`${loc} must use ${SITE_URL}`);
  }

  if (seen.has(loc)) {
    fail(`${loc} is duplicated`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
    fail(`${loc} has invalid lastmod ${lastmod}`);
  }

  if (!changefreqValues.has(changefreq)) {
    fail(`${loc} has invalid changefreq ${changefreq}`);
  }

  const priorityValue = Number(priority);
  if (!Number.isFinite(priorityValue) || priorityValue < 0 || priorityValue > 1) {
    fail(`${loc} has invalid priority ${priority}`);
  }

  seen.add(loc);
}

console.log(`Validated sitemap.xml with ${urlBlocks.length} URLs.`);
