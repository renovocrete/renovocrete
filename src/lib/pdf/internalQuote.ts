import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { CalcOutput } from "@/lib/calculator";

export interface InternalQuoteMeta {
  clientName: string;
  siteAddress?: string;
  product: string;
  surface: number;
  coats: number;
  pricePerGallon: number;
  notes?: string;
  lang: "fr" | "en";
}

const fmt = (n: number, lang: "fr" | "en") =>
  n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function exportInternalQuotePDF(meta: InternalQuoteMeta, out: CalcOutput): string {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const lang = meta.lang;
  const T = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // Header
  doc.setFillColor(31, 31, 34);
  doc.rect(0, 0, W, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("RENOVO CRETE", 14, 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(T("FICHE INTERNE — Ne pas diffuser", "INTERNAL — Do not share"), W - 14, 11, { align: "right" });

  // Watermark
  doc.setTextColor(220, 53, 69, );
  (doc as any).setGState && (doc as any).setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.setFont("helvetica", "bold");
  doc.setFontSize(60);
  doc.text(T("INTERNE", "INTERNAL"), W / 2, 160, { align: "center", angle: 30 });
  (doc as any).setGState && (doc as any).setGState(new (doc as any).GState({ opacity: 1 }));

  // Title
  doc.setTextColor(31, 31, 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(T("Devis interne — Détail technique & marge", "Internal quote — Technical & margin"), 14, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 128);
  doc.text(`${T("Émis le", "Issued on")} ${new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}`, 14, 38);

  // Client
  let y = 48;
  doc.setTextColor(31, 31, 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`${T("Client", "Client")}: ${meta.clientName || "—"}`, 14, y);
  if (meta.siteAddress) { y += 5; doc.setFont("helvetica", "normal"); doc.text(meta.siteAddress, 14, y); }

  // Technical table
  y += 8;
  autoTable(doc, {
    startY: y,
    head: [[T("Paramètre technique", "Technical parameter"), T("Valeur", "Value")]],
    body: [
      [T("Produit ECS", "ECS product"), meta.product],
      [T("Surface", "Surface"), `${meta.surface} m²`],
      [T("Couches", "Coats"), String(meta.coats)],
      [T("Ratio A:B", "A:B ratio"), out.ratio],
      [T("Total mélangé", "Total mixed"), `${out.totalGallons} gal`],
      ["Part A", `${out.partA} gal`],
      ["Part B", out.partB ? `${out.partB} gal` : "—"],
      [T("Prix par gallon", "Price per gallon"), `${fmt(meta.pricePerGallon, lang)} €`],
    ],
    theme: "grid",
    headStyles: { fillColor: [31, 31, 34], textColor: 255 },
    styles: { fontSize: 9 },
  });

  // Cost table
  const y2 = (doc as any).lastAutoTable.finalY + 6;
  autoTable(doc, {
    startY: y2,
    head: [[T("Poste", "Item"), T("Montant (€)", "Amount (€)")]],
    body: [
      [T("Coût matière", "Material cost"), fmt(out.costMaterial, lang)],
      [T("Coût main-d'œuvre", "Labor cost"), fmt(out.costLabor, lang)],
      [T("Coût total", "Total cost"), fmt(out.totalCost, lang)],
      [T("Prix de vente", "Sale price"), fmt(out.salePrice, lang)],
      [T("Marge (€)", "Margin (€)"), fmt(out.marginAmount, lang)],
      [T("Marge (%)", "Margin (%)"), `${out.marginPct} %`],
    ],
    theme: "striped",
    headStyles: { fillColor: [44, 78, 184], textColor: 255 },
    styles: { fontSize: 9 },
    columnStyles: { 1: { halign: "right" } },
  });

  if (meta.notes) {
    const y3 = (doc as any).lastAutoTable.finalY + 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(T("Notes chantier", "Site notes"), 14, y3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(meta.notes, W - 28);
    doc.text(lines, 14, y3 + 5);
  }

  doc.setFontSize(7);
  doc.setTextColor(120, 120, 128);
  doc.text(T("Document interne — diffusion réservée à RENOVO CRETE et au sous-traitant.", "Internal — distribution restricted to RENOVO CRETE and the contractor."), W / 2, 290, { align: "center" });

  const fname = `renovo-devis-interne-${(meta.clientName || "chantier").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`;
  doc.save(fname);
  return fname;
}
