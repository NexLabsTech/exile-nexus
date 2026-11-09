import type { APIRoute } from "astro";
import publication from "../data/publication-policy.json";
import { createRobotsTxt, type PublicationPolicy } from "../lib/seo-policy";

export const prerender = true;
export const GET: APIRoute = () => new Response(
  createRobotsTxt(publication as PublicationPolicy),
  { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" } },
);
