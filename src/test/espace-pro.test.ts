import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ESPACE_PRO_HREF } from "@/lib/espacePro";

const PORTAL = path.resolve(__dirname, "../../public/espace-pro/index.html");

describe("espace professionnel HTML portal", () => {
  const html = readFileSync(PORTAL, "utf8");

  it("is linked at a static public path the SPA cannot swallow", () => {
    expect(ESPACE_PRO_HREF).toBe("/espace-pro/index.html");
  });

  it("ships as a single HTML document with the V29 login surface", () => {
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('id="loginEmail"');
    expect(html).toContain('id="loginPassword"');
    expect(html).toContain('id="loginButton"');
    expect(html).toContain('id="authScreen"');
    expect(html).toContain("BASE_CATALOG");
  });

  it("is proposal-ready: French default, no version dump in the title, demo launchers", () => {
    expect(html).toContain('<html lang="fr">');
    expect(html).toContain("<title>RENOVO CRETE — Espace professionnel</title>");
    expect(html).not.toContain("Global Professional Portal V12");
    expect(html).not.toContain("V29 Launch Readiness");
    expect(html).toContain('id="rcPitchAdmin"');
    expect(html).toContain('id="rcPitchPro"');
    expect(html).toContain("if(!s.language)s.language='fr'");
  });
});
