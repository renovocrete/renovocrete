import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(process.cwd(), "public/espace-pro/index.html"), "utf8");

describe("espace-pro V29 commercial portal", () => {
  it("is implanted as a French professional portal rather than a ChatGPT draft title", () => {
    expect(html).toContain("<html lang=\"fr\">");
    expect(html).toContain("RENOVO CRETE — Portail professionnel");
    expect(html).not.toContain("Global Professional Portal V12");
  });

  it("keeps the login workspace and V29 launch runtime", () => {
    expect(html).toContain('id="loginEmail"');
    expect(html).toContain('id="loginPassword"');
    expect(html).toContain('id="loginButton"');
    expect(html).toContain('id="appShell"');
    expect(html).toContain("window.RC29_QA");
    expect(html).toContain('id="renovo-v29-launch-style"');
  });

  it("presents demonstration accounts as a commercial proposal, not a local prototype label", () => {
    expect(html).toContain("Comptes de démonstration commerciale");
    expect(html).toContain("admin@renovocrete.local");
    expect(html).toContain("s.language='fr'");
    expect(html).not.toContain("<b>Prototype local :</b>");
    expect(html).not.toContain("<b>Local prototype accounts:</b>");
  });

  it("includes sale-ready document hygiene", () => {
    expect(html).toContain('name="robots" content="noindex,nofollow"');
    expect(html).toContain("window.__renovoPortal");
    expect(html).toContain("Aller à la connexion");
    expect(html).toContain("family=Inter");
  });
});
