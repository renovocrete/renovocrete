import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { CalcOutput } from "@/lib/calculator";

export interface ClientQuoteMeta {
  clientName: string;
  siteAddress?: string;
  product: string;
  surface: number;
  coats: number;
  lang: "fr" | "en";
}

const fmt = (n: number, lang: "fr" | "en") =>
  n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function exportClientQuotePDF(meta: ClientQuoteMeta, out: CalcOutput): string {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const lang = meta.lang;
  const T = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // Header band
  doc.setFillColor(44, 78, 184);
  doc.rect(0, 0, W, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("RENOVO CRETE", 14, 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(T("Devis professionnel", "Professional quote"), W - 14, 11, { align: "right" });

  // Title
  doc.setTextColor(31, 31, 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(T("Devis", "Quote"), 14, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 128);
  doc.text(`${T("Émis le", "Issued on")} ${new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}`, 14, 38);

  // Client block
  let y = 50;
  doc.setTextColor(31, 31, 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(T("CLIENT", "CLIENT"), 14, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(meta.clientName || "—", 14, y);
  if (meta.siteAddress) { y += 5; doc.text(meta.siteAddress, 14, y); }

  // Quote table — NO costs, NO margin shown to client
  y += 10;
  autoTable(doc, {
    startY: y,
    head: [[T("Désignation", "Description"), T("Surface", "Surface"), T("Couches", "Coats"), T("Prix unitaire", "Unit price"), T("Total HT", "Total")]],
    body: [[
      meta.product,
      `${meta.surface} m²`,
      String(meta.coats),
      `${fmt(out.salePrice / Math.max(meta.surface, 1), lang)} € / m²`,
      `${fmt(out.salePrice, lang)} €`,
    ]],
    theme: "striped",
    headStyles: { fillColor: [44, 78, 184], textColor: 255 },
    styles: { fontSize: 9, cellPadding: 3 },
  });

  // Total band
  const finalY = (doc as any).lastAutoTable.finalY + 6;
  doc.setFillColor(44, 78, 184);
  doc.rect(110, finalY, 86, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(T("TOTAL", "TOTAL"), 114, finalY + 9);
  doc.text(`${fmt(out.salePrice, lang)} €`, 192, finalY + 9, { align: "right" });

  // CGV
  doc.setTextColor(120, 120, 128);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  const cgv = T(
    "Conditions générales : devis valable 30 jours. Acompte de 30% à la commande. Solde à la réception du chantier. TVA non applicable, art. 293 B du CGI le cas échéant. Délais et conditions chantier à confirmer.",
    "Terms: quote valid 30 days. 30% deposit on order. Balance on completion. VAT not applicable where relevant. Lead times and site conditions to be confirmed."
  );
  const cgvLines = doc.splitTextToSize(cgv, W - 28);
  doc.text(cgvLines, 14, finalY + 28);

  doc.setFontSize(7);
  doc.setTextColor(120, 120, 128);
  doc.text("Renovo Crete · Saint-Martin · renovocrete@gmail.com · 0690 53 58 34", W / 2, 290, { align: "center" });

  const fname = `renovo-devis-client-${(meta.clientName || "client").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`;
  doc.save(fname);
  return fname;
}
