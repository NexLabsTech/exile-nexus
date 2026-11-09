import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const APP_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const ALLOWED_FIELDS = ["scriptGzipBytes", "styleGzipBytes", "homeHtmlGzipBytes", "entireDistRawBytes"];

export function validateBudgets(budget) {
  if (!budget || budget.schemaVersion !== 1 || !budget.staticAssets) {
    throw new Error("Unsupported or missing budget schema");
  }
  for (const key of ALLOWED_FIELDS) {
    const val = budget.staticAssets[key];
    if (!Number.isSafeInteger(val) || val <= 0) {
      throw new Error(`Invalid finite positive budget: ${key}`);
    }
  }
  return budget.staticAssets;
}

function scanDist(directory, root = directory) {
  const files = [];
  for (const name of readdirSync(directory).sort()) {
    const absolute = join(directory, name);
    const stat = lstatSync(absolute);
    if (stat.isSymbolicLink()) throw new Error(`Unexpected symlink: ${absolute}`);
    if (stat.isDirectory()) {
      files.push(...scanDist(absolute, root));
    } else if (stat.isFile()) {
      const bytes = readFileSync(absolute);
      files.push({
        path: relative(root, absolute).split("\\").join("/"),
        bytes: bytes.length,
        gzipBytes: gzipSync(bytes, { level: 9 }).length,
      });
    }
  }
  return files;
}

export function inspectDist(distDir, budget) {
  const thresholds = validateBudgets(budget);
  const dist = resolve(distDir);
  const required = ["index.html", "builds/index.html", "ui-kit/index.html"];
  for (const path of required) {
    if (!existsSync(join(dist, path))) throw new Error(`Required page missing from build: ${path}`);
  }
  const files = scanDist(dist);
  const scripts = files.filter((f) => /\.(?:js|mjs)$/.test(f.path));
  const styles = files.filter((f) => /\.css$/.test(f.path));
  if (scripts.length === 0 || styles.length === 0) throw new Error("Missing compiled scripts or styles");
  const home = files.find((f) => f.path === "index.html");
  const metrics = {
    scriptGzipBytes: scripts.reduce((n, f) => n + f.gzipBytes, 0),
    styleGzipBytes: styles.reduce((n, f) => n + f.gzipBytes, 0),
    homeHtmlGzipBytes: home.gzipBytes,
    entireDistRawBytes: files.reduce((n, f) => n + f.bytes, 0),
  };
  const violations = ALLOWED_FIELDS.filter((key) => metrics[key] > thresholds[key]).map(
    (key) => `${key} ${metrics[key]} bytes exceeds ${thresholds[key]} bytes`,
  );
  return { passed: violations.length === 0, metrics, thresholds, files, violations };
}

export function run({ distDir, budgetPath, outputPath }) {
  const budget = JSON.parse(readFileSync(budgetPath, "utf8"));
  const result = inspectDist(distDir, budget);
  if (outputPath) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");
  }
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const outputArg = process.argv.find((arg) => arg.startsWith("--output="));
    const report = run({
      distDir: join(APP_ROOT, "dist"),
      budgetPath: join(APP_ROOT, "performance-budgets.json"),
      outputPath: outputArg ? resolve(outputArg.slice("--output=".length)) : undefined,
    });
    console.log(JSON.stringify({
      passed: report.passed,
      metrics: report.metrics,
      limits: report.thresholds,
      violations: report.violations,
    }, null, 2));
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    console.error("EXN_M01_WO_005_BUDGET_FAIL", error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
