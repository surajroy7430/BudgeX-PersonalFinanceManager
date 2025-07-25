import { useCallback } from "react";
import { parseDate } from "@/lib/parseDate";
import { differenceInDays } from "date-fns";

export const getFilteredDataByDays = (data, days) => {
  const today = new Date();

  return data.filter((item) => {
    const parsedDate = parseDate(item.date);
    return differenceInDays(today, parsedDate) <= days;
  });
};

export const getTotalAmountForDays = (data, days) => {
  const filtered = getFilteredDataByDays(data, days);
  return filtered.reduce((sum, item) => sum + item.amount, 0);
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString("en-IN");
};
export const formatCurrencyTo2Dec = (amount) => {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const capitalize = (str) =>
  str
    .trim()
    .split(" ")
    .map((word) =>
      word === word.toUpperCase()
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
