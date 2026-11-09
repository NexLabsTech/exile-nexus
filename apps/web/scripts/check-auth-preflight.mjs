import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../src/data/auth-zero-cost-preflight.json", import.meta.url);
const LIMITS = Object.freeze({
  workerRequestsPerDay:100000,
  workerCpuMsPerInvocation:10,
  d1RowsReadPerDay:5000000,
  d1RowsWrittenPerDay:100000,
  d1TotalStorageGB:5,
  d1MaxDatabaseMB:500
});
const PENDING = Object.freeze([
  "G01: real Cloudflare account plan, billing and quotas NOT_VERIFIED",
  "G01: Pages Functions versus Workers Static Assets NOT_SELECTED",
  "G01: Google OAuth production origin/brand eligibility NOT_VERIFIED",
  "G02: lawful basis, privacy notice, retention and user-deletion approval NOT_RECEIVED",
  "G03: isolated runtime and secret-handling test environment NOT_AUTHORIZED",
  "G04: HIGH_ASSURANCE independent proof verification and risk acceptance NOT_RUN",
  "S01: no server endpoint or authenticated capability may be enabled"
]);

/** Reference-check only. Does not authenticate to Cloudflare, Google or billing APIs.
 * Any plausible account attestation remains UNVERIFIED until independently read back.
 */
export function assessAuthZeroCost(reference, accountEvidence = null) {
  const failures = [];
  if (!reference || reference.schemaVersion !== 1 ||
      reference.classification !== "PUBLIC_REFERENCE_ONLY" ||
      reference.ownerDirection !== "CONDITIONALLY_APPROVED_2026_11_09" ||
      reference.monthlySpendCeilingUSD !== 0 || reference.plan !== "Workers Free + D1 Free") {
    failures.push("Invalid zero-cost policy identity or hard US$0 ceiling");
  }
  for (const [key, expected] of Object.entries(LIMITS)) {
    if (!reference?.limits || reference.limits[key] !== expected) {
      failures.push(`Missing/changed published reference limit: ${key}`);
    }
  }
  for (const [key, expected] of [
    ["hostingChoice","PENDING_ACCOUNT_AND_RUNTIME_BENCHMARK"],
    ["accountFreeEligibility","NOT_VERIFIED"],
    ["domainAndGoogleOidc","NOT_VERIFIED"],
    ["lgpdPrivacy","NOT_APPROVED"],
    ["limiterStrictness","NOT_VERIFIED"],
    ["independentProof","NOT_RUN"],
    ["productionAuth","BLOCKED"],
  ]) {
    if (reference?.[key] !== expected) failures.push(`Premature or missing authorization in ${key}`);
  }
  const documentation = reference?.documentation;
  for (const key of ["workerLimits","d1Pricing","d1Limits","rateLimit","pagesPricing","workerAssets"]) {
    const uri = documentation?.[key];
    if (typeof uri !== "string" || !uri.startsWith("https://developers.cloudflare.com/")) {
      failures.push(`Missing primary-source documentation URL: ${key}`);
    }
  }
  if (accountEvidence !== null) {
    // User-asserted or test-fixture text does not prove live account status or ownership.
    // It must never grant the ability to enable auth, regardless of any claimed value.
    if (typeof accountEvidence !== "object" || Array.isArray(accountEvidence) ||
        accountEvidence === null) failures.push("Invalid claimed account evidence");
  }
  const reasons = [...failures, ...PENDING];
  return {
    status:"BLOCKED",
    gate:"G01_G04",
    ownerDirection:"CONDITIONALLY_APPROVED",
    documentationStructurallyValid:failures.length===0,
    accountBillingVerified:false,
    oauthOriginVerified:false,
    privacyApproved:false,
    isolatedRuntimeAuthorized:false,
    globallyStrictRateLimitProven:false,
    productionAuthAuthorized:false,
    possibleAccountClaimsSupplied:accountEvidence!==null,
    reasons
  };
}

export function readAuthPreflight() {
  return assessAuthZeroCost(JSON.parse(readFileSync(ROOT, "utf8")));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result=readAuthPreflight();
    const output=process.argv.find((arg)=>arg.startsWith("--output="))?.slice("--output=".length);
    if(output) {
      const file=resolve(output);
      mkdirSync(dirname(file),{recursive:true});
      writeFileSync(file,JSON.stringify(result,null,2)+"\n");
    }
    console.log(JSON.stringify(result,null,2));
    const expectingBlock=process.argv.includes("--expect-blocked");
    // The check is green only if the declared BLOCKED preflight is structurally valid.
    // Without --expect-blocked, S01 must be stopped; never confuse CI PASS with ready.
    if(!expectingBlock || result.status!=="BLOCKED" ||
       !result.documentationStructurallyValid || result.productionAuthAuthorized) process.exitCode=1;
  } catch(error) {
    console.error("AUTH_FREE_PREFLIGHT_FAIL_CLOSED",error instanceof Error?error.message:String(error));
    process.exitCode=1;
  }
}
