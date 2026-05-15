import { get, set, del } from "idb-keyval";

export interface QuoteHistoryEntry {
  id: string;
  date: string;            // ISO
  clientName: string;
  siteAddress?: string;
  productKey: string;      // ProductLine
  productName: string;
  surface: number;
  coats: number;
  ratio: string;           // "2:1"
  pricePerGallon: number;
  totalGallons: number;
  costMaterial: number;
  costLabor: number;
  totalCost: number;
  salePrice: number;
  margin: number;
  marginPct: number;
  status: "draft" | "sent" | "accepted" | "refused";
  notes?: string;
}

const KEY = "renovo-quotes-history-v1";
const MAX = 50;

export async function listHistory(): Promise<QuoteHistoryEntry[]> {
  return ((await get(KEY)) as QuoteHistoryEntry[] | undefined) || [];
}

export async function saveEntry(entry: QuoteHistoryEntry): Promise<void> {
  const cur = await listHistory();
  const next = [entry, ...cur.filter((e) => e.id !== entry.id)].slice(0, MAX);
  await set(KEY, next);
}

export async function removeEntry(id: string): Promise<void> {
  const cur = await listHistory();
  await set(KEY, cur.filter((e) => e.id !== id));
}

export async function clearHistory(): Promise<void> {
  await del(KEY);
}
