import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../src/data/auth-zero-cost-preflight.json", import.meta.url);

// Published reference values only. No account-specific cost or eligibility assertion.
const EXPECTED = Object.freeze({
  "schemaVersion": 2,
  "classification": "PUBLIC_REFERENCE_ONLY",
  "ownerDirection": "RATIFIED_NETLIFY_SUPABASE_2026_11_22",
  "monthlySpendCeilingUSD": 0,
  "providers": {
    "hosting": "NETLIFY_FREE",
    "identityDatabase": "SUPABASE_FREE",
    "paidUpgrade": "MANUAL_OWNER_APPROVAL_ONLY"
  },
  "limits": {
    "netlifyCreditsPerMonth": 300,
    "netlifyHardCreditLimit": true,
    "supabaseFreeProjects": 2,
    "supabaseDatabaseMBPerProject": 500,
    "supabaseMonthlyActiveUsers": 50000,
    "supabaseEgressGB": 5,
    "supabaseFileStorageGB": 1
  },
  "netlifyAccountEligibility": "NOT_VERIFIED",
  "supabaseAccountBilling": "NOT_VERIFIED",
  "supabaseProjectForExileNexus": "NOT_VERIFIED",
  "hostingChoice": "PENDING_RUNTIME_BENCHMARK",
  "domainAndGoogleOidc": "NOT_VERIFIED",
  "lgpdPrivacy": "NOT_APPROVED",
  "sessionDesign": "NOT_APPROVED",
  "limiterStrictness": "NOT_VERIFIED",
  "isolatedEnvironment": "NOT_AUTHORIZED",
  "independentProof": "NOT_RUN",
  "productionAuth": "BLOCKED",
  "documentation": {
    "netlifyPricing": "https://www.netlify.com/pricing/",
    "netlifyCredits": "https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/",
    "netlifyAstro": "https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/",
    "supabasePricing": "https://supabase.com/pricing",
    "supabasePausing": "https://supabase.com/docs/guides/platform/free-project-pausing",
    "supabaseAuth": "https://supabase.com/docs/guides/auth/sessions"
  }
});
const PENDING = Object.freeze([
  "G00: architecture direction RATIFIED; session design and runtime benchmark PENDING",
  "G01: Netlify account Free plan, usage, billing and upgrade safeguards NOT_VERIFIED",
  "G01: Supabase organization Free plan, project ownership, billing and quotas NOT_VERIFIED",
  "G01: Google OAuth redirect origin, domain, branding and eligibility NOT_VERIFIED",
  "G02: LGPD purpose, controller/processors, retention and deletion NOT_APPROVED",
  "G03: isolated authorized test environment and privileged secrets handling NOT_AUTHORIZED",
  "G04: AUTH-01..14 backend security, RLS, atomic rate limits and recovery NOT_RUN",
  "S01: production identity, credentials and deployment remain BLOCKED"
]);

function isPlainObject(value) {
  return value !== null && typeof value === "object" &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

function verifyExact(reference, expected, path, failures) {
  if (!isPlainObject(reference)) {
    failures.push("Missing or invalid reference object: " + path);
    return;
  }
  const actualKeys = Object.keys(reference);
  const expectedKeys = Object.keys(expected);
  for (const key of actualKeys) {
    if (!Object.hasOwn(expected, key)) failures.push("Unexpected reference field: " + path + "." + key);
  }
  for (const key of expectedKeys) {
    if (!Object.hasOwn(reference, key)) {
      failures.push("Missing reference field: " + path + "." + key);
    } else if (isPlainObject(expected[key])) {
      verifyExact(reference[key], expected[key], path + "." + key, failures);
    } else if (!Object.is(reference[key], expected[key])) {
      failures.push("Unexpected reference value: " + path + "." + key);
    }
  }
}

/**
 * Reference-only structural validation. Cannot approve paid plans, accounts,
 * privacy, credentials or production auth. Caller-supplied evidence is untrusted.
 */
export function assessAuthZeroCost(reference, accountEvidence = null) {
  const failures = [];
  verifyExact(reference, EXPECTED, "reference", failures);
  const claimSupplied = accountEvidence !== null;
  if (claimSupplied && !isPlainObject(accountEvidence)) {
    failures.push("Malformed/untrusted account claim");
  }
  const reasons = [
    ...failures,
    ...(claimSupplied ? ["Caller-supplied account claims are not authoritative read-back"] : []),
    ...PENDING
  ];
  return {
    status: "BLOCKED",
    gate: "G01_G04",
    ownerDirection: "RATIFIED_NETLIFY_SUPABASE",
    documentationStructurallyValid: failures.length === 0,
    netlifyAccountVerified: false,
    supabaseAccountVerified: false,
    accountBillingVerified: false,
    supabaseProjectBindingVerified: false,
    oauthOriginVerified: false,
    privacyApproved: false,
    isolatedRuntimeAuthorized: false,
    globallyStrictRateLimitProven: false,
    productionAuthAuthorized: false,
    possibleAccountClaimsSupplied: claimSupplied,
    reasons
  };
}

export function readAuthPreflight() {
  return assessAuthZeroCost(JSON.parse(readFileSync(ROOT, "utf8")));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = readAuthPreflight();
    const output = process.argv.find((arg) => arg.startsWith("--output="))?.slice("--output=".length);
    if (output) {
      const file = resolve(output);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, JSON.stringify(result, null, 2) + "\n");
    }
    console.log(JSON.stringify(result, null, 2));
    // A green check means only that the BLOCKED state is structurally enforced.
    const expectingBlocked = process.argv.includes("--expect-blocked");
    if (!expectingBlocked || result.status !== "BLOCKED" ||
        !result.documentationStructurallyValid || result.productionAuthAuthorized) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("AUTH_FREE_PREFLIGHT_FAIL_CLOSED", error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
