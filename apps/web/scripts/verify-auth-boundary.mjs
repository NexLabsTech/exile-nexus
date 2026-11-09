import { readFileSync, existsSync, readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = resolve(fileURLToPath(new URL("..",import.meta.url)));

async function loadContract(root) {
  const input = readFileSync(join(root,"src/lib/identity-contract.ts"),"utf8");
  const js = ts.transpileModule(input,{fileName:"identity-contract.ts",compilerOptions:{
    module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022
  }});
  return import(`data:text/javascript;base64,${Buffer.from(js.outputText).toString("base64")}`);
}

export function verifyIdentityArtifacts({policy,routes,distDir,validator}) {
  const failures=[];
  try { validator(policy); } catch (error) { failures.push(`Invalid identity policy: ${error instanceof Error?error.message:error}`); }
  const expected = ["/",...routes.map((r)=>r.href),"/search/","/ui-kit/","/404.html"];
  if(expected.length!==11 || new Set(expected).size!==11 ||
     JSON.stringify([...expected].sort())!==JSON.stringify([...(policy.publicPaths??[])].sort())) {
    failures.push("Identity public-path contract differs from current 11 approved app routes");
  }
  const staticPaths=[];
  for(const path of expected) {
    const dest = path==="/404.html" ? "404.html" : path==="/" ? "index.html" : path.slice(1)+"index.html";
    const file=join(distDir,dest);
    if(!existsSync(file)) { failures.push(`Missing public anonymous page: ${path}`);continue; }
    const content=readFileSync(file,"utf8");
    if(/<input\b[^>]*type=(["'])password\1/i.test(content)) {
      failures.push(`Unapproved password input on ${path}`);
    }
    if(/<form\b[^>]*action=(["'])[^"']*(?:login|signup|register|auth)[^"']*\1/i.test(content)) {
      failures.push(`Unapproved login form on ${path}`);
    }
    if(!/<meta\s+name="robots" content="noindex,nofollow"/.test(content)) {
      failures.push(`Unexpected SEO/publication change on ${path}`);
    }
    staticPaths.push(path);
  }
  for(const reserved of policy.reservedAuthPaths??[]) {
    const directory=join(distDir,reserved.slice(1));
    if(existsSync(directory)) failures.push(`Unapproved auth/account route generated: ${reserved}`);
  }
  const privateDirCandidates=["_sessions","api/auth","admin","users","account","profile","login","logout"];
  for(const dirnamePart of privateDirCandidates) {
    if(existsSync(join(distDir,dirnamePart))) failures.push(`Unexpected identity endpoint/public artifact: ${dirnamePart}`);
  }
  // Search only emitted HTML. A JS-string reference to "login" is not an auth endpoint.
  const files=[...walkFiles(distDir)].filter((file)=>file.endsWith(".html"));
  if(files.length!==expected.length) failures.push(`Unexpected HTML route count ${files.length}; expected ${expected.length}`);
  return {passed:failures.length===0,mode:policy.mode,publicRoutesVerified:staticPaths.length,
    permittedIdentityProviders:0,sessionBackendVerified:false,logoutVerified:false,
    csrfVerified:false,rateLimiterVerified:false,manualSecurityReview:"NOT_RUN",
    failures};
}
function* walkFiles(path) {
  if(!existsSync(path))return;
  for(const entry of readdirSync(path)) {
    const file=join(path,entry);
    if(statSync(file).isDirectory()) yield* walkFiles(file);
    else yield file;
  }
}
export async function verifyRepoIdentity(root=ROOT) {
  const {validateIdentitySecurityPolicy}=await loadContract(root);
  const policy=JSON.parse(readFileSync(join(root,"src/data/identity-security-policy.json"),"utf8"));
  const routes=JSON.parse(readFileSync(join(root,"src/data/routes.json"),"utf8"));
  return verifyIdentityArtifacts({policy,routes,distDir:join(root,"dist"),validator:validateIdentitySecurityPolicy});
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const result=await verifyRepoIdentity();
    const out=process.argv.find((arg)=>arg.startsWith("--output="))?.slice("--output=".length);
    if(out) {
      const file=resolve(out);mkdirSync(dirname(file),{recursive:true});
      writeFileSync(file,JSON.stringify(result,null,2)+"\n");
    }
    console.log(JSON.stringify(result,null,2));
    if(!result.passed)process.exitCode=1;
  }catch(error){
    console.error("EXN_IDENTITY_FAIL_CLOSED",error instanceof Error?error.message:String(error));
    process.exitCode=1;
  }
}
