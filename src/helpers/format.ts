export function inr(n: number): string {
  if (!isFinite(n)) return '₹0';
  const r = Math.round(n);
  const sign = r < 0 ? '-' : '';
  return sign + '₹' + Math.abs(r).toLocaleString('en-IN');
}
