export type RightsStatus = "AUTORIZADO" | "CONDICIONADO" | "NÃO VERIFICADO" | "PROIBIDO";
export type RightsGate =
  | "REFERENCE_ONLY"
  | "HOLD_RIGHTS"
  | "PROHIBITED"
  | "POTENTIAL_CODE_REUSE"
  | "CONDITIONAL_ORIGINAL";

type SourcePurpose = "reference" | "ingest" | "cache" | "persist" | "display" | "monetize" | "reuse-code";

export interface SourceRegistration {
  readonly id: string;
  readonly owner: string | null;
  readonly surface: string;
  readonly rightsStatus: RightsStatus;
  readonly gates: readonly RightsGate[];
  readonly referenceUrls: readonly string[];
  readonly reviewNote: string;
}

interface SourceUseRequest {
  readonly sourceId: string;
  readonly purpose: SourcePurpose;
  readonly url?: string | null;
}

type SourceUseDecision =
  | { allowed: true; reason: "DOCUMENTARY_REFERENCE" }
  | {
    allowed: false;
    reason: "UNKNOWN_SOURCE" | "OPERATION_NOT_ADMITTED" | "REFERENCE_NOT_APPROVED" | "REFERENCE_NOT_REGISTERED";
  };

export const sourceRegistry = Object.freeze({
  schemaVersion: 1,
  authority: "docs/rights-and-data-sources.md",
  authorityRevision: "2026-11-08",
});

const gameOwner = "Grinding Gear Games Ltd.";
const developerDocs = "https://www.pathofexile.com/developer/docs";
const economyDocs = "https://poe.ninja/docs/api";

const registrations: readonly SourceRegistration[] = [
  {
    id: "R01",
    owner: gameOwner,
    surface: "Terms of use and privacy policy",
    rightsStatus: "AUTORIZADO",
    gates: ["REFERENCE_ONLY"],
    referenceUrls: ["https://www.pathofexile.com/legal/terms-of-use-and-privacy-policy"],
    reviewNote: "Documentary consultation only. Game content and commercial rights are unverified.",
  },
  {
    id: "R02",
    owner: gameOwner,
    surface: "Developer documentation and API policies",
    rightsStatus: "CONDICIONADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: [developerDocs],
    reviewNote: "Requires legitimate credentials, permitted use and display rights, and verified limits.",
  },
  {
    id: "R03",
    owner: gameOwner,
    surface: "Currency Exchange API",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: [developerDocs],
    reviewNote: "Access eligibility, authentication, display and commercial use require evidence.",
  },
  {
    id: "R04",
    owner: gameOwner,
    surface: "Official PoE2 passive tree export",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: [
      "https://www.pathofexile.com/developer/docs/data",
      "https://github.com/grindinggear/poe2-skilltree-export",
    ],
    reviewNote: "Requires permission and attribution per asset before import, display or distribution.",
  },
  {
    id: "R05",
    owner: "poe.ninja",
    surface: "Public economy API",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: [economyDocs, "https://poe.ninja/terms/"],
    reviewNote: "Requires written clarification of display, commercial use, storage and limits.",
  },
  {
    id: "R06",
    owner: "poe.ninja",
    surface: "Internal builds, profiles and other non-economy endpoints",
    rightsStatus: "PROIBIDO",
    gates: ["PROHIBITED"],
    referenceUrls: [economyDocs],
    reviewNote: "The accepted matrix prohibits integration with internal or unsupported endpoints.",
  },
  {
    id: "R07",
    owner: "PoE2 Scout",
    surface: "PoE2 Scout software",
    rightsStatus: "CONDICIONADO",
    gates: ["POTENTIAL_CODE_REUSE"],
    referenceUrls: [
      "https://github.com/poe2scout/poe2scout",
      "https://github.com/poe2scout/poe2scout/blob/main/LICENSE",
    ],
    reviewNote: "Code reuse requires a notice and dependency audit. API and game data use is tracked separately under R08.",
  },
  {
    id: "R08",
    owner: null,
    surface: "PoE2 Scout economy API and data",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: ["https://api.poe2scout.com/swagger"],
    reviewNote: "The legal operator, data license, attribution and commercial redistribution rights are unverified.",
  },
  {
    id: "R09",
    owner: "cvenzin",
    surface: "PoE2 passive tree planner and underlying datasets",
    rightsStatus: "CONDICIONADO",
    gates: ["POTENTIAL_CODE_REUSE", "HOLD_RIGHTS"],
    referenceUrls: ["https://github.com/cvenzin/poe2-skilltree"],
    reviewNote: "Audit code notices and each dataset or asset separately before reuse.",
  },
  {
    id: "R10",
    owner: "Google",
    surface: "AdSense and publisher policies",
    rightsStatus: "CONDICIONADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: [
      "https://support.google.com/adsense/answer/10502938?hl=pt-BR",
      "https://support.google.com/adsense/answer/48182?hl=en",
    ],
    reviewNote: "Monetization requires content rights, policy compliance and a separate activation decision.",
  },
  {
    id: "R11",
    owner: null,
    surface: "Potential player submissions",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["CONDITIONAL_ORIGINAL"],
    referenceUrls: [],
    reviewNote: "Requires terms, permission from each creator, privacy protections and moderation.",
  },
  {
    id: "R12",
    owner: null,
    surface: "PoE2Wiki community content",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: ["https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki"],
    reviewNote: "The legal operator, terms, license, API and attribution require verification.",
  },
  {
    id: "R13",
    owner: null,
    surface: "PoE2DB community data and statistics",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["HOLD_RIGHTS"],
    referenceUrls: ["https://poe2db.tw/"],
    reviewNote: "The legal operator, terms, API and redistribution rights require verification.",
  },
  {
    id: "R14",
    owner: "NexLabsTech",
    surface: "Original Exile Nexus material",
    rightsStatus: "NÃO VERIFICADO",
    gates: ["CONDITIONAL_ORIGINAL"],
    referenceUrls: [],
    reviewNote: "Future materials require documented asset provenance, notices and similarity review.",
  },
];

export function listSourceRegistrations(): readonly SourceRegistration[] {
  return registrations.map((source) => ({
    ...source,
    gates: [...source.gates],
    referenceUrls: [...source.referenceUrls],
  }));
}

export function evaluateSourceUse(request: SourceUseRequest): SourceUseDecision {
  const source = registrations.find(({ id }) => id === request.sourceId);
  if (!source) return { allowed: false, reason: "UNKNOWN_SOURCE" };

  // Version 1 authorizes no data or code operations from the documentary matrix.
  if (request.purpose !== "reference") return { allowed: false, reason: "OPERATION_NOT_ADMITTED" };
  if (!source.owner || source.rightsStatus !== "AUTORIZADO" || !source.gates.includes("REFERENCE_ONLY")) {
    return { allowed: false, reason: "REFERENCE_NOT_APPROVED" };
  }
  if (!request.url || !source.referenceUrls.includes(request.url)) {
    return { allowed: false, reason: "REFERENCE_NOT_REGISTERED" };
  }
  return { allowed: true, reason: "DOCUMENTARY_REFERENCE" };
}
