import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface TechSheetData {
  partnerName?: string;
  projectTitle?: string;
  product: string;
  productRef?: string;
  color: string;
  finish: string;
  surface_m2: number;
  quantityEstimate?: string;
  recommendations?: string;
  estimatedBudget?: number;
  generatedAt?: Date;
}

export function exportTechSheetPDF(d: TechSheetData): string {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(20, 36, 84);
  doc.rect(0, 0, 210, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("RENOVO CRETE — Fiche technique", 14, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Espace privé Architectes & Constructeurs", 14, 19);

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(11);
  let y = 32;
  if (d.partnerName) { doc.text(`Partenaire : ${d.partnerName}`, 14, y); y += 6; }
  if (d.projectTitle) { doc.text(`Projet : ${d.projectTitle}`, 14, y); y += 6; }
  doc.text(`Date : ${(d.generatedAt ?? new Date()).toLocaleDateString("fr-FR")}`, 14, y); y += 8;

  autoTable(doc, {
    startY: y,
    head: [["Caractéristique", "Valeur"]],
    body: [
      ["Produit", d.product],
      ["Référence produit", d.productRef ?? "—"],
      ["Couleur", d.color],
      ["Finition", d.finish],
      ["Surface concernée", `${d.surface_m2.toLocaleString("fr-FR")} m²`],
      ["Quantité estimée", d.quantityEstimate ?? `${Math.ceil(d.surface_m2 * 0.5)} kg (estimation)`],
      ["Budget estimé", d.estimatedBudget ? `${d.estimatedBudget.toLocaleString("fr-FR")} €` : "Sur demande"],
    ],
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [20, 36, 84] },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont("helvetica", "bold");
  doc.text("Recommandations techniques", 14, finalY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const recs = d.recommendations ??
    "Préparer le support : décapage, dépoussiérage et primaire d'accrochage. Appliquer en 2 couches minimum, temps de séchage entre couches : 6h. Vernis de protection recommandé pour zones à fort passage.";
  doc.text(doc.splitTextToSize(recs, 182), 14, finalY + 6);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Document confidentiel — Renovo Crete © " + new Date().getFullYear(), 14, 287);

  const filename = `fiche-technique-${(d.projectTitle || "renovo").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
  doc.save(filename);
  return filename;
}
