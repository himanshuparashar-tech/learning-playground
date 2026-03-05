import { DEFAULT_MEMBERS, STORAGE_KEY_MEMBERS } from "./constants";

export const roundToTwoDecimals = (value) => Math.round(value * 100) / 100;

/** Returns YYYY-MM for current month (local time) - matches MonthPicker format */
export const getCurrentPeriod = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const formatCurrency = (amount) =>
  `₹${roundToTwoDecimals(amount).toFixed(2)}`;

export const getInitialMembers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_MEMBERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const byId = new Map();
        parsed.forEach((m) => m?.id && byId.set(m.id, m));
        return byId.size > 0 ? [...byId.values()] : [...DEFAULT_MEMBERS];
      }
    }
  } catch (e) {
    /* ignore */
  }
  return [...DEFAULT_MEMBERS];
};
