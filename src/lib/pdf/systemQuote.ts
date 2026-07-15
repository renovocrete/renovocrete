import jsPDF from "jspdf";
import type { SystemCalcResult } from "@/lib/systemCalculator";

export function exportSystemQuotePDF(res: SystemCalcResult, opts?: { clientName?: string; company?: string }) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  let y = 40;

  doc.setFont("helvetica", "bold"); doc.setFontSize(18);
  doc.text("RENOVO CRETE — Devis système", 40, y); y += 24;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  doc.text(new Date(res.createdAt).toLocaleString("fr-FR"), 40, y); y += 20;

  doc.setFontSize(12); doc.setFont("helvetica","bold");
  doc.text(res.system.name, 40, y); y += 16;
  doc.setFont("helvetica","normal"); doc.setFontSize(10);
  doc.text(`Projet : ${res.input.projectName || "—"}`, 40, y); y += 14;
  doc.text(`Localisation : ${res.input.location || "—"}`, 40, y); y += 14;
  doc.text(`Surface : ${res.input.surface} m² · Marge sécurité : ${res.input.lossPct}%`, 40, y); y += 14;
  if (opts?.company) { doc.text(`Client : ${opts.company}`, 40, y); y += 14; }
  y += 8;

  doc.setFont("helvetica","bold"); doc.setFontSize(11);
  doc.text("Détail par couche", 40, y); y += 16;
  doc.setFont("helvetica","normal"); doc.setFontSize(9);

  res.layers.forEach((l, idx) => {
    if (y > 760) { doc.addPage(); y = 40; }
    doc.setFont("helvetica","bold"); doc.text(`${idx+1}. ${l.layerName}`, 40, y); y += 12;
    doc.setFont("helvetica","normal");
    doc.text(`Fonction : ${l.function}`, 50, y); y += 11;
    doc.text(`Produit : ${l.productLabel}`, 50, y); y += 11;
    doc.text(`Rendement : ${l.coveragePerUnit} m²/${l.unit === "gallon" ? "gal" : l.unit} · ${l.coats} passe(s) · Surface calculée : ${l.effectiveSurface} m²`, 50, y); y += 11;
    doc.text(`Besoin théorique : ${l.theoreticalQty} ${l.unit}(s) · À commander : ${l.qtyToOrder} × ${l.packaging} · Reliquat : ${l.leftover} ${l.unit}(s)`, 50, y); y += 11;
    doc.text(`Prix unitaire : ${l.unitPriceEUR.toFixed(2)} € · Total ligne : ${l.lineTotalEUR.toFixed(2)} €`, 50, y); y += 14;
  });

  if (y > 720) { doc.addPage(); y = 40; }
  y += 8;
  doc.setDrawColor(200); doc.line(40, y, W - 40, y); y += 18;
  doc.setFont("helvetica","bold"); doc.setFontSize(14);
  doc.text(`Total produits : ${res.totalEUR.toFixed(2)} €`, 40, y); y += 20;
  doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(120);
  doc.text("Prix indicatifs hors transport et hors taxes locales éventuelles. Devis non contractuel.", 40, y);

  doc.save(`RENOVO-${res.system.key}-${(res.input.projectName || "devis").replace(/\s+/g,"_")}.pdf`);
}
