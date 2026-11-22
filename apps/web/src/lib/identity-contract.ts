/** EXN-M01-WO-010: an intentionally unprivileged, provider-free security boundary.
 * NOT an authentication implementation. No token or client-provided role can grant access.
 */
export type IdentityMode = "ANONYMOUS_ONLY";
export type ProtectedOperation =
  | "save_private" | "edit_private" | "manage_users"
  | "publish_content" | "change_roles" | "manage_sessions";
export type PublicOperation = "read_public";
export type Operation = PublicOperation | ProtectedOperation;

export interface IdentitySecurityPolicy {
  schemaVersion: 1;
  mode: IdentityMode;
  approvedIdentityProvider: null;
  approvedSessionStore: null;
  approvedServerRuntime: null;
  approvalEvidence: null;
  allowIdentityCollection: false;
  allowCookieSessions: false;
  allowPrivilegedOperations: false;
  publicPaths: string[];
  publicOperations: PublicOperation[];
  protectedOperations: ProtectedOperation[];
  reservedAuthPaths: string[];
  notes: string;
}
export interface AuthorizationDecision {
  allowed: boolean;
  code: "PUBLIC_ANONYMOUS_ALLOWED" | "DENY_PRIVILEGED" | "DENY_UNTRUSTED_PRINCIPAL" |
    "DENY_UNKNOWN_OPERATION" | "DENY_UNLISTED_ROUTE" | "DENY_MALFORMED_REQUEST";
}
const REQUIRED_PROTECTED: ProtectedOperation[] = [
  "save_private", "edit_private", "manage_users", "publish_content", "change_roles", "manage_sessions",
];
const REQUIRED_RESERVED = [
  "/login/","/logout/","/signup/","/register/","/account/","/profile/",
  "/admin/","/settings/","/auth/","/api/auth/",
];
const PATH = /^\/(?:[a-z0-9-]+\/)*$/;
const ROUTE = /^\/(?:[a-z0-9-]+\/)*$|^\/404\.html$/;

function distinctPaths(paths: unknown, kind: string, pattern: RegExp): string[] {
  if (!Array.isArray(paths) || paths.length === 0 || paths.some((p) => typeof p !== "string" || !pattern.test(p))) {
    throw new Error(`Invalid ${kind} routes`);
  }
  if (new Set(paths).size !== paths.length) throw new Error(`Duplicate ${kind} route`);
  return paths as string[];
}

export function validateIdentitySecurityPolicy(policy: IdentitySecurityPolicy): IdentitySecurityPolicy {
  if (!policy || policy.schemaVersion !== 1 || policy.mode !== "ANONYMOUS_ONLY" ||
      policy.approvedIdentityProvider !== null || policy.approvedSessionStore !== null ||
      policy.approvedServerRuntime !== null || policy.approvalEvidence !== null ||
      policy.allowIdentityCollection !== false || policy.allowCookieSessions !== false ||
      policy.allowPrivilegedOperations !== false) {
    throw new Error("BLOCKED: real identity runtime/provider/privacy approval is absent");
  }
  if (JSON.stringify(policy.publicOperations) !== JSON.stringify(["read_public"])) {
    throw new Error("Only read_public is allowed for anonymous visitors");
  }
  if (!Array.isArray(policy.protectedOperations) ||
      JSON.stringify([...policy.protectedOperations].sort()) !== JSON.stringify([...REQUIRED_PROTECTED].sort())) {
    throw new Error("Protected operations registry cannot be weakened");
  }
  const pub = distinctPaths(policy.publicPaths, "public", ROUTE);
  if (!pub.includes("/") || !pub.includes("/404.html")) throw new Error("Missing required original public routes");
  const priv = distinctPaths(policy.reservedAuthPaths, "reserved authentication", PATH);
  for (const reserved of REQUIRED_RESERVED) if (!priv.includes(reserved)) throw new Error(`Missing protected auth route: ${reserved}`);
  if (pub.some((p) => priv.some((pvt) => p === pvt || p.startsWith(pvt)))) {
    throw new Error("Protected auth route may not be on public allowlist");
  }
  if (typeof policy.notes !== "string" || !policy.notes.includes("No provider")) {
    throw new Error("Missing provider/capability limitation notice");
  }
  return policy;
}

/** Accepts only a no-principal, public-read request shape. Anything else is denied.
 * No user session can be constructed, accepted or rehydrated here.
 * A future backend MUST replace this with independently reviewed server authorization.
 */
export function authorizeAnonymous(
  policy: IdentitySecurityPolicy,
  request: unknown,
): AuthorizationDecision {
  validateIdentitySecurityPolicy(policy);
  if (typeof request !== "object" || request === null || Array.isArray(request)) {
    return { allowed: false, code: "DENY_MALFORMED_REQUEST" };
  }
  const input = request as Record<string, unknown>;
  const names = Object.keys(input).sort();
  if (JSON.stringify(names) !== JSON.stringify(["operation","path","principal"])) {
    return { allowed: false, code: "DENY_MALFORMED_REQUEST" };
  }
  if (input.principal !== null) return { allowed: false, code: "DENY_UNTRUSTED_PRINCIPAL" };
  if (typeof input.operation !== "string") return { allowed: false, code: "DENY_MALFORMED_REQUEST" };
  if ((REQUIRED_PROTECTED as string[]).includes(input.operation)) {
    return { allowed: false, code: "DENY_PRIVILEGED" };
  }
  if (input.operation !== "read_public") return { allowed: false, code: "DENY_UNKNOWN_OPERATION" };
  if (typeof input.path !== "string" || !policy.publicPaths.includes(input.path)) {
    return { allowed: false, code: "DENY_UNLISTED_ROUTE" };
  }
  return { allowed: true, code: "PUBLIC_ANONYMOUS_ALLOWED" };
}
