import { existsSync, readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { ESPACE_PRO_PATH, ESPACE_PRO_ROUTE } from "@/lib/espacePro";
import { espaceProHtml } from "../../vite-plugin-espace-pro";

describe("espace-pro HTML portal", () => {
  const htmlPath = path.resolve(__dirname, "../../public/espace-pro/index.html");

  it("keeps the HTML file in public so Vite copies it to the site", () => {
    expect(existsSync(htmlPath)).toBe(true);
    expect(ESPACE_PRO_PATH).toBe("/espace-pro/index.html");
    expect(ESPACE_PRO_ROUTE).toBe("/espace-pro");
  });

  it("is the RENOVO CRETE professional portal", () => {
    const html = readFileSync(htmlPath, "utf8");
    expect(html).toContain("<title>RENOVO CRETE — Portail professionnel</title>");
    expect(html).toContain('id="loginEmail"');
    expect(html).toContain('id="loginPassword"');
    expect(html).toContain("Retour au site RENOVO CRETE");
  });

  it("declares production aliases so /espace-pro is not swallowed by the SPA", () => {
    const redirects = readFileSync(path.resolve(__dirname, "../../public/_redirects"), "utf8");
    expect(redirects).toContain("/espace-pro  /espace-pro/index.html  200");
    expect(redirects).toContain("/espace-pro/ /espace-pro/index.html  200");
  });

  it("registers the Vite plugin that serves the HTML at /espace-pro", () => {
    expect(espaceProHtml().name).toBe("espace-pro-html");
  });
});
