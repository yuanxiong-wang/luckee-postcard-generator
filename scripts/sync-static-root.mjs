import { cp } from "node:fs/promises";
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
  "holiday-photos",
];

for (const name of entries) {
  const from = path.join(src, name);
  const to = path.join(dest, name);
  await cp(from, to, { recursive: true });
}
