import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import test from "node:test";
import { assessAuthZeroCost, readAuthPreflight } from "../../scripts/check-auth-preflight.mjs";

const reference = JSON.parse(readFileSync(new URL("../../src/data/auth-zero-cost-preflight.json", import.meta.url), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

test("owner-approved conditional direction is NOT an authorization to run S01", () => {
  const verdict=readAuthPreflight();
  assert.equal(verdict.status,"BLOCKED");
  assert.equal(verdict.documentationStructurallyValid,true);
  assert.equal(verdict.accountBillingVerified,false);
  assert.equal(verdict.productionAuthAuthorized,false);
  assert.ok(verdict.reasons.some((x)=>x.includes("G01")));
  assert.ok(verdict.reasons.some((x)=>x.includes("G04")));
});

test("hard US$0 cost ceiling and Free account reference limits cannot drift", () => {
  for(const [key,value] of Object.entries({
    workerRequestsPerDay:100000,workerCpuMsPerInvocation:10,
    d1RowsReadPerDay:5000000,d1RowsWrittenPerDay:100000,
    d1TotalStorageGB:5,d1MaxDatabaseMB:500,
  })) {
    const changed=clone(reference);changed.limits[key]=value+1;
    const result=assessAuthZeroCost(changed);
    assert.equal(result.documentationStructurallyValid,false,key);
    assert.equal(result.productionAuthAuthorized,false,key);
  }
  const paid=clone(reference);paid.monthlySpendCeilingUSD=1;
  assert.equal(assessAuthZeroCost(paid).documentationStructurallyValid,false);
});

test("account eligibility, a selected runtime or auth enabled without proof is rejected", () => {
  for(const patch of [
    {accountFreeEligibility:"VERIFIED"},
    {hostingChoice:"PAGES_FUNCTIONS"},
    {domainAndGoogleOidc:"VERIFIED"},
    {lgpdPrivacy:"APPROVED"},
    {limiterStrictness:"VERIFIED"},
    {independentProof:"PASS"},
    {productionAuth:"ENABLED"},
  ]){
    const result=assessAuthZeroCost({...reference,...patch});
    assert.equal(result.documentationStructurallyValid,false,JSON.stringify(patch));
    assert.equal(result.status,"BLOCKED");
  }
});

test("claims of paid-proof or signed-attestation cannot self-authorize auth", () => {
  for(const claim of [
    {plan:"Workers Free",monthlySpendUSD:0,verified:true},
    {accountFreeEligibility:"VERIFIED",approvedBy:"owner",signed:"yes"},
    {allGatesPassed:true,admin:true,forceReady:true},
    {accountProof:"https://example.test/attestation",privacyApproved:true,strictLimiter:true},
  ]){
    const decision=assessAuthZeroCost(reference,claim);
    assert.equal(decision.accountBillingVerified,false);
    assert.equal(decision.productionAuthAuthorized,false);
    assert.equal(decision.status,"BLOCKED");
    assert.equal(decision.possibleAccountClaimsSupplied,true);
  }
});

test("documentation source omission or non-official URL fails closed", () => {
  for(const field of Object.keys(reference.documentation)){
    const missing=clone(reference);delete missing.documentation[field];
    assert.equal(assessAuthZeroCost(missing).documentationStructurallyValid,false);
    const wrong=clone(reference);wrong.documentation[field]="https://malicious.example/cost";
    assert.equal(assessAuthZeroCost(wrong).documentationStructurallyValid,false);
  }
});

test("malformed or empty policy is never interpreted as approved", () => {
  for(const value of [null,undefined,{},[],{schemaVersion:2},0,"Free"]){
    const result=assessAuthZeroCost(value);
    assert.equal(result.status,"BLOCKED");
    assert.equal(result.documentationStructurallyValid,false);
    assert.equal(result.productionAuthAuthorized,false);
  }
});
