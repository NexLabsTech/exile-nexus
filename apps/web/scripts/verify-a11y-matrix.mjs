import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

const fixture=new URL("../tests/fixtures/accessibility-matrix.json",import.meta.url);
const routeFile=new URL("../src/data/routes.json",import.meta.url);
export const REQUIRED_TAGS=["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"];
export const REQUIRED_STATES=["default","search-empty","search-error","ui-error","ui-disabled","mobile-menu"];

export function verifyAccessibilityMatrix(matrix, routes) {
  const failures=[];
  if(matrix?.schemaVersion!==1)failures.push("Unsupported accessibility matrix schema");
  const paths=matrix?.routes?.map((r)=>r.path);
  const expected=["/",...routes.map((r)=>r.href),"/search/","/ui-kit/","/404.html"];
  if(!Array.isArray(paths)||paths.length!==expected.length||
     new Set(paths).size!==paths.length||JSON.stringify([...paths].sort())!==JSON.stringify([...expected].sort()))
    failures.push("Accessibility audit must cover all existing 11 public/static routes with no duplicates");
  const viewports=matrix?.viewports??[];
  const widths=new Set(viewports.map((v)=>v.width));
  for(const width of [320,390,768,1440])if(!widths.has(width))failures.push(`Missing responsive viewport ${width}`);
  for(const v of viewports)if(!Number.isInteger(v.width)||!Number.isInteger(v.height)||v.height<500)failures.push("Invalid viewport size");
  for(const t of REQUIRED_TAGS)if(!matrix?.axeTags?.includes(t))failures.push(`Missing WCAG tag ${t}`);
  for(const st of REQUIRED_STATES)if(!matrix?.requiredStates?.includes(st))failures.push(`Missing interactive/a11y state ${st}`);
  if(matrix?.criticalViolationLimit!==0||matrix?.seriousViolationLimit!==0)failures.push("Serious or critical a11y gate must not be relaxed");
  if(!matrix?.notes?.includes("NOT_RUN"))failures.push("Missing explicit NOT_RUN manual screen reader status");
  return {passed:failures.length===0,routeCount:paths?.length??0,viewportCount:viewports.length,failures};
}

export function readAccessibilityMatrix() {
  return verifyAccessibilityMatrix(
    JSON.parse(readFileSync(fixture,"utf8")),
    JSON.parse(readFileSync(routeFile,"utf8")),
  );
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=readAccessibilityMatrix();
  console.log(JSON.stringify(result,null,2));
  if(!result.passed)process.exitCode=1;
}
