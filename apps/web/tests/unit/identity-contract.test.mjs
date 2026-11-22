import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Buffer } from "node:buffer";
import test from "node:test";
import { URL } from "node:url";
import ts from "typescript";

const policy = JSON.parse(readFileSync(new URL("../../src/data/identity-security-policy.json", import.meta.url),"utf8"));
const source = readFileSync(new URL("../../src/lib/identity-contract.ts", import.meta.url),"utf8");
const js=ts.transpileModule(source,{fileName:"identity-contract.ts",compilerOptions:{
  module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,
}});
const {validateIdentitySecurityPolicy,authorizeAnonymous}=await import(`data:text/javascript;base64,${Buffer.from(js.outputText).toString("base64")}`);
const copy=(x)=>JSON.parse(JSON.stringify(x));

test("shipped policy explicitly has no identity, backend, secrets, sessions or private permissions",()=>{
  validateIdentitySecurityPolicy(policy);
  assert.equal(policy.mode,"ANONYMOUS_ONLY");
  for(const key of ["approvedIdentityProvider","approvedSessionStore","approvedServerRuntime","approvalEvidence"]) {
    assert.equal(policy[key],null);
  }
  for(const key of ["allowIdentityCollection","allowCookieSessions","allowPrivilegedOperations"]) {
    assert.equal(policy[key],false);
  }
  assert.equal(policy.publicPaths.length,11);
});

test("anonymous original public routes are permitted as a read-only contract",()=>{
  for(const path of policy.publicPaths) {
    assert.deepEqual(authorizeAnonymous(policy,{principal:null,operation:"read_public",path}),{
      allowed:true,code:"PUBLIC_ANONYMOUS_ALLOWED",
    });
  }
});

test("all protected commands remain denied even when resource is a public route",()=>{
  for(const op of policy.protectedOperations) {
    assert.deepEqual(authorizeAnonymous(policy,{principal:null,operation:op,path:"/"}),{
      allowed:false,code:"DENY_PRIVILEGED",
    });
  }
});

test("forged role, token, userId, session, and admin principal do not grant public or private access",()=>{
  for(const principal of [
    {role:"admin"}, {role:"member"}, {userId:"admin"}, {id:"any",auth:true},
    "bearer-secret", {sessionId:"valid-looking-token"}, {role:"anonymous"},
  ]) {
    for(const operation of ["read_public","manage_users","change_roles"]) {
      const out=authorizeAnonymous(policy,{principal,operation,path:"/"});
      assert.equal(out.allowed,false,JSON.stringify(principal));
      assert.equal(out.code,"DENY_UNTRUSTED_PRINCIPAL");
    }
  }
});

test("extra client claims, unknown operations or unlisted paths cannot relax policy",()=>{
  for(const invalid of [
    {principal:null,operation:"read_public",path:"/",role:"admin"},
    {principal:null,operation:"read_public",path:"/",token:"abc"},
    {principal:null,operation:"read_public",path:"/",userId:1},
    {principal:null,operation:"read_public",path:"/",headers:{authorization:"Bearer x"}},
    {principal:null,operation:"read_public",path:"/admin/"},
    {principal:null,operation:"read_public",path:"/login/"},
    {principal:null,operation:"not_a_real_action",path:"/"},
    {principal:null,operation:15,path:"/"},
    null,[],{}, "anonymous",
  ]) assert.equal(authorizeAnonymous(policy,invalid).allowed,false,JSON.stringify(invalid));
});

test("enable mode, invented provider, store, backend or privacy approval always fails closed",()=>{
  const changes=[
    {mode:"ENABLED",approvedIdentityProvider:"test-provider"},
    {approvedIdentityProvider:"any"}, {approvedSessionStore:"mock"},
    {approvedServerRuntime:"edge"}, {approvalEvidence:"EXN-AUTH-PUBLISH-TEST"},
    {allowIdentityCollection:true}, {allowCookieSessions:true},
    {allowPrivilegedOperations:true},{schemaVersion:2},
  ];
  for(const patch of changes)assert.throws(()=>validateIdentitySecurityPolicy({...policy,...patch}),/BLOCKED/);
});

test("missing protected operation, privileged allowlist addition and missing auth reservation are rejected",()=>{
  const a=copy(policy);a.protectedOperations=a.protectedOperations.filter(x=>x!=="manage_users");
  assert.throws(()=>validateIdentitySecurityPolicy(a),/registry/);
  const b=copy(policy);b.publicOperations.push("manage_users");
  assert.throws(()=>validateIdentitySecurityPolicy(b),/Only read_public/);
  const c=copy(policy);c.publicPaths.push("/admin/");
  assert.throws(()=>validateIdentitySecurityPolicy(c),/Protected auth route/);
  const d=copy(policy);d.reservedAuthPaths=d.reservedAuthPaths.filter(x=>x!=="/login/");
  assert.throws(()=>validateIdentitySecurityPolicy(d),/Missing protected auth route/);
});

test("malformed path, duplicates, missing Home and missing caveat are invalid",()=>{
  const patches=[
    {publicPaths:[...policy.publicPaths,"/"]},
    {publicPaths:policy.publicPaths.filter(x=>x!=="/")},
    {publicPaths:[...policy.publicPaths,"//admin/"]},
    {reservedAuthPaths:[...policy.reservedAuthPaths,"/login/"]},
    {notes:"all security complete"},
  ];
  for(const patch of patches)assert.throws(()=>validateIdentitySecurityPolicy({...policy,...patch}));
});
