export interface WatchItem {
  name: string;
  price: string;
  unit: string;
  category: string;
  targetPrice?: number;
  addedAt: string;
}

const KEY = "pricepulse_watchlist";

export function getWatchlist(): WatchItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToWatchlist(item: WatchItem) {
  const list = getWatchlist();
  const exists = list.find((i) => i.name === item.name);
  if (exists) return list;
  const updated = [...list, item];
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function removeFromWatchlist(name: string) {
  const list = getWatchlist().filter((i) => i.name !== name);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

export function isInWatchlist(name: string): boolean {
  return getWatchlist().some((i) => i.name === name);
}

export function setTargetPrice(name: string, target: number) {
  const list = getWatchlist().map((i) =>
    i.name === name ? { ...i, targetPrice: target } : i
  );
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}