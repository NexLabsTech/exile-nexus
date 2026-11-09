import type { APIRoute } from "astro";
import publication from "../data/publication-policy.json";
import { createSitemapXml, type PublicationPolicy } from "../lib/seo-policy";

export const prerender = true;
export const GET: APIRoute = () => new Response(
  createSitemapXml(publication as PublicationPolicy),
  { headers: { "Content-Type": "application/xml; charset=utf-8", "X-Content-Type-Options": "nosniff" } },
);
