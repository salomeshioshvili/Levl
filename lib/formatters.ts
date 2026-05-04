function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function calendarDaysBetween(later: Date, earlier: Date) {
  return Math.round((startOfDay(later) - startOfDay(earlier)) / 86400000);
}

export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (amount < 0) return `-$${formatted}`;
  return `$${formatted}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const diff = calendarDaysBetween(today, d);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatSectionHeader(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const diff = calendarDaysBetween(today, d);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff >= 2) return `${diff} days ago`;
  return formatDate(dateStr);
}

export function isSameCalendarDay(a: string, b: Date = new Date()) {
  const da = new Date(a);
  return calendarDaysBetween(b, da) === 0;
}

export function formatTransactionRowDate(dateStr: string): string {
  const base = formatDate(dateStr);
  if (isSameCalendarDay(dateStr)) {
    return `${base} · ${formatTime(dateStr)}`;
  }
  return base;
}

export function getProgressPercentage(saved: number, target: number): number {
  if (target <= 0) return 0;
  const p = (saved / target) * 100;
  return Math.min(100, Math.max(0, Math.round(p)));
}

export function getProgressLabel(saved: number, target: number): string {
  return `${getProgressPercentage(saved, target)}%`;
}
