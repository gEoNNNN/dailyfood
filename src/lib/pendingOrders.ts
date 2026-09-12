import { promises as fs } from "fs";
import path from "path";

export type PendingOrder = {
  orderId: string;
  message: string;
  createdAt: number;
};

const PENDING_PATH = path.join(process.cwd(), "data", "pending-orders.json");

async function readPending(): Promise<PendingOrder[]> {
  try {
    const raw = await fs.readFile(PENDING_PATH, "utf-8");
    const data = JSON.parse(raw.replace(/^\uFEFF/, "")) as PendingOrder[];
    if (Array.isArray(data)) return data;
  } catch {}
  return [];
}

async function writePending(orders: PendingOrder[]) {
  await fs.mkdir(path.dirname(PENDING_PATH), { recursive: true });
  await fs.writeFile(PENDING_PATH, JSON.stringify(orders, null, 2), "utf-8");
}

export async function addPendingOrder(order: PendingOrder) {
  const orders = await readPending();
  orders.push(order);
  await writePending(orders);
}

export async function getPendingOrders(): Promise<PendingOrder[]> {
  return readPending();
}

export async function removePendingOrder(orderId: string) {
  const orders = await readPending();
  const filtered = orders.filter((o) => o.orderId !== orderId);
  await writePending(filtered);
  return filtered;
}

export async function clearPendingOrders() {
  await writePending([]);
}
