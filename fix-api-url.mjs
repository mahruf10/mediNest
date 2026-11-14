import fs from "fs";
import path from "path";

const BACKEND = "https://medi-nest-server-ten.vercel.app";
const IMPORT = `import { API_URL } from "@/src/lib/config";\n`;
const roots = ["src", "components", "app", "lib"];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "node_modules" ? [] : walk(p);
    return /\.(ts|tsx)$/.test(p) ? [p] : [];
  });
}

for (const root of roots) {
  for (const file of walk(root)) {
    if (file.replace(/\\/g, "/").endsWith("src/lib/config.ts")) continue;

    let src = fs.readFileSync(file, "utf8");
    if (!src.includes(BACKEND)) continue;

    // "https://...vercel.app/path" or '...' -> `${API_URL}/path`
    src = src.replace(
      new RegExp(`(["'])${BACKEND}([^"'\\n]*)\\1`, "g"),
      (_, q, rest) => "`${API_URL}" + rest + "`"
    );
    // already inside backticks -> ${API_URL}
    src = src.split(BACKEND).join("${API_URL}");

    if (!src.includes('from "@/src/lib/config"')) {
      const directive = src.match(/^\s*(["'])use (client|server)\1;?\s*\n/);
      src = directive
        ? src.replace(directive[0], directive[0] + "\n" + IMPORT)
        : IMPORT + src;
    }

    fs.writeFileSync(file, src);
    console.log("fixed:", file);
  }
}