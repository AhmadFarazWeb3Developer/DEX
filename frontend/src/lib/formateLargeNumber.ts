export const formatLargeNumber = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return "0";

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";

  return num.toString();
};
