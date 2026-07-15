// Panier partagé entre le calculateur de systèmes et l'onglet Commande produits.
// Pub/sub simple + persistance localStorage (clé par utilisateur ou "guest").

import { useEffect, useState } from "react";

export interface CartLine {
  /** id unique de ligne */
  lineId: string;
  /** id du calcul source — permet d'éviter les doublons quand on ré-ajoute le même calcul */
  calcId?: string;
  /** projet source (nom lisible) */
  projectName?: string;
  /** système source (nom lisible) */
  systemName?: string;
  /** couche source (nom lisible) */
  layerName?: string;
  /** SKU produit ECS */
  productId: string;
  productLabel: string;
  packaging: string;
  /** quantité de conditionnements commandés */
  qty: number;
  /** quantité minimale (calculée) — bloque la baisse en-dessous */
  minQty: number;
  /** prix unitaire EUR (Plafond bon prix EUR au moment de l'ajout) */
  unitPriceEUR: number;
  /** surface m² du calcul source (pour info) */
  surface?: number;
}

const KEY_PREFIX = "renovo:cart:";
type Listener = (lines: CartLine[]) => void;

class CartStore {
  private lines: CartLine[] = [];
  private listeners = new Set<Listener>();
  private userKey = "guest";

  setUser(uid: string | null) {
    this.userKey = uid || "guest";
    this.load();
  }
  private load() {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + this.userKey);
      this.lines = raw ? JSON.parse(raw) : [];
    } catch { this.lines = []; }
    this.emit();
  }
  private persist() {
    try { localStorage.setItem(KEY_PREFIX + this.userKey, JSON.stringify(this.lines)); } catch { /* noop */ }
  }
  private emit() { this.listeners.forEach((l) => l([...this.lines])); }

  subscribe(l: Listener) { this.listeners.add(l); l([...this.lines]); return () => { this.listeners.delete(l); }; }

  getAll() { return [...this.lines]; }

  addMany(newLines: Omit<CartLine, "lineId">[]) {
    // Anti-doublons : si un calcId est fourni, on retire d'abord toutes les lignes de ce calc.
    const calcIds = new Set(newLines.map((l) => l.calcId).filter(Boolean) as string[]);
    if (calcIds.size > 0) this.lines = this.lines.filter((l) => !l.calcId || !calcIds.has(l.calcId));
    for (const nl of newLines) {
      this.lines.push({ ...nl, lineId: crypto.randomUUID() });
    }
    this.persist(); this.emit();
  }
  setQty(lineId: string, qty: number) {
    this.lines = this.lines.map((l) => l.lineId === lineId ? { ...l, qty: Math.max(l.minQty, qty) } : l);
    this.persist(); this.emit();
  }
  remove(lineId: string) {
    this.lines = this.lines.filter((l) => l.lineId !== lineId);
    this.persist(); this.emit();
  }
  removeProject(projectName: string) {
    this.lines = this.lines.filter((l) => l.projectName !== projectName);
    this.persist(); this.emit();
  }
  clear() { this.lines = []; this.persist(); this.emit(); }
}

export const cartStore = new CartStore();

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(cartStore.getAll());
  useEffect(() => cartStore.subscribe(setLines), []);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unitPriceEUR, 0);
  return { lines, subtotal, add: cartStore.addMany.bind(cartStore), setQty: cartStore.setQty.bind(cartStore), remove: cartStore.remove.bind(cartStore), removeProject: cartStore.removeProject.bind(cartStore), clear: cartStore.clear.bind(cartStore) };
}
