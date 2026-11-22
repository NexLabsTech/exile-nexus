import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { assessAuthZeroCost, readAuthPreflight } from "../../scripts/check-auth-preflight.mjs";

const reference = JSON.parse(readFileSync(new URL("../../src/data/auth-zero-cost-preflight.json", import.meta.url), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

test("ratified Netlify/Supabase direction is not authorization to run S01", () => {
  const verdict = readAuthPreflight();
  assert.equal(verdict.status, "BLOCKED");
  assert.equal(verdict.ownerDirection, "RATIFIED_NETLIFY_SUPABASE");
  assert.equal(verdict.documentationStructurallyValid, true);
  for (const field of ["accountBillingVerified","netlifyAccountVerified","supabaseAccountVerified","productionAuthAuthorized"]) {
    assert.equal(verdict[field], false, field);
  }
  assert.ok(verdict.reasons.some((x) => x.includes("G01")));
  assert.ok(verdict.reasons.some((x) => x.includes("G04")));
});

test("hard US$0 and published Free limits cannot drift", () => {
  const changedValues = {
    netlifyCreditsPerMonth: 301,
    netlifyHardCreditLimit: false,
    supabaseFreeProjects: 3,
    supabaseDatabaseMBPerProject: 501,
    supabaseMonthlyActiveUsers: 50001,
    supabaseEgressGB: 6,
    supabaseFileStorageGB: 2
  };
  for (const [key,value] of Object.entries(changedValues)) {
    const changed = clone(reference);
    changed.limits[key] = value;
    assert.equal(assessAuthZeroCost(changed).documentationStructurallyValid, false, key);
  }
  for (const patch of [
    {monthlySpendCeilingUSD: 1},
    {schemaVersion: 1},
    {ownerDirection: "CONDITIONALLY_APPROVED_2026_11_09"},
    {classification: "ACCOUNT_VERIFIED"}
  ]) {
    assert.equal(assessAuthZeroCost({...reference,...patch}).documentationStructurallyValid,false);
  }
});

test("provider switching or paid upgrade always fails closed", () => {
  for (const patch of [
    {hosting:"CLOUDFLARE_FREE"},
    {hosting:"NETLIFY_PERSONAL"},
    {identityDatabase:"SUPABASE_PRO"},
    {identityDatabase:"D1_FREE"},
    {paidUpgrade:"AUTOMATIC"}
  ]) {
    const changed = clone(reference);
    Object.assign(changed.providers,patch);
    assert.equal(assessAuthZeroCost(changed).documentationStructurallyValid,false,JSON.stringify(patch));
  }
});

test("account claims, runtime and permission promotion cannot authorize auth", () => {
  for (const patch of [
    {netlifyAccountEligibility:"VERIFIED"},
    {supabaseAccountBilling:"VERIFIED"},
    {supabaseProjectForExileNexus:"READY"},
    {hostingChoice:"NETLIFY_FUNCTIONS"},
    {domainAndGoogleOidc:"VERIFIED"},
    {lgpdPrivacy:"APPROVED"},
    {sessionDesign:"APPROVED"},
    {limiterStrictness:"VERIFIED"},
    {isolatedEnvironment:"AUTHORIZED"},
    {independentProof:"PASS"},
    {productionAuth:"ENABLED"}
  ]) {
    const verdict = assessAuthZeroCost({...reference,...patch});
    assert.equal(verdict.status,"BLOCKED");
    assert.equal(verdict.documentationStructurallyValid,false,JSON.stringify(patch));
    assert.equal(verdict.productionAuthAuthorized,false);
  }
});

test("untrusted signed/billing account claims do not bypass preflight", () => {
  for (const claim of [
    {provider:"Netlify",plan:"Free",billingVerified:true},
    {provider:"Supabase",project:"poe2-nexus",admin:true},
    {ownerApproval:true,approvedBy:"owner",signed:"yes"},
    {status:"READY",proofUrl:"https://example.test/attestation",allGatesPassed:true}
  ]) {
    const verdict = assessAuthZeroCost(reference,claim);
    assert.equal(verdict.status,"BLOCKED");
    assert.equal(verdict.documentationStructurallyValid,true);
    assert.equal(verdict.accountBillingVerified,false);
    assert.equal(verdict.productionAuthAuthorized,false);
    assert.equal(verdict.possibleAccountClaimsSupplied,true);
  }
});

test("only exact official documentation URLs are accepted", () => {
  for (const key of Object.keys(reference.documentation)) {
    const missing = clone(reference);
    delete missing.documentation[key];
    assert.equal(assessAuthZeroCost(missing).documentationStructurallyValid,false,key);
    const changed = clone(reference);
    changed.documentation[key] = "https://netlify.example.invalid/limits";
    assert.equal(assessAuthZeroCost(changed).documentationStructurallyValid,false,key);
  }
});

test("missing, extra, unexpected or prototype fields fail closed", () => {
  const unexpected=clone(reference);unexpected.productionAuthAuthorized=true;
  assert.equal(assessAuthZeroCost(unexpected).documentationStructurallyValid,false);
  const unexpectedNested=clone(reference);unexpectedNested.providers.superAdmin=true;
  assert.equal(assessAuthZeroCost(unexpectedNested).documentationStructurallyValid,false);
  const missing=clone(reference);delete missing.providers;
  assert.equal(assessAuthZeroCost(missing).documentationStructurallyValid,false);
  const malicious=JSON.parse('{"schemaVersion":2,"__proto__":{"admin":true}}');
  assert.equal(assessAuthZeroCost(malicious).documentationStructurallyValid,false);
});

test("malformed policy or fake attestation cannot become ready", () => {
  for (const input of [null,undefined,{},[],{schemaVersion:3},0,"Free",Object.create(null)]) {
    const verdict=assessAuthZeroCost(input);
    assert.equal(verdict.status,"BLOCKED");
    assert.equal(verdict.documentationStructurallyValid,false);
  }
  const verdict=assessAuthZeroCost(reference,"APPROVED");
  assert.equal(verdict.documentationStructurallyValid,false);
  assert.equal(verdict.productionAuthAuthorized,false);
});

test("CLI passes only with explicit --expect-blocked, refuses use as authorization", () => {
  const script = new URL("../../scripts/check-auth-preflight.mjs",import.meta.url);
  const allowed=spawnSync(process.execPath,[script.pathname,"--expect-blocked"],{encoding:"utf8"});
  assert.equal(allowed.status,0,allowed.stderr);
  assert.equal(JSON.parse(allowed.stdout).productionAuthAuthorized,false);
  const refused=spawnSync(process.execPath,[script.pathname],{encoding:"utf8"});
  assert.equal(refused.status,1);
});
