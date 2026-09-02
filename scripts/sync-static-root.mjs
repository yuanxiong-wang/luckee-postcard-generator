import { cp, rm } from "node:fs/promises";
import path from "node:path";

const src = path.resolve("dist/public");
const dest = path.resolve(".");
const entries = [
  "index.html",
  "assets",
  "_headers",
  "_redirects",
  "favicon.svg",
  "og-image.svg",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "holiday-backgrounds",
];

for (const name of entries) {
  const from = path.join(src, name);
  const to = path.join(dest, name);
  await rm(to, { recursive: true, force: true });
  await cp(from, to, { recursive: true });
}
