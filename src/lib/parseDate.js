import { isValid, parse } from "date-fns";

export const parseDate = (dateStr) => {
  const parsed = parse(dateStr, "dd MMM yyyy", new Date());
  return isValid(parsed) ? parsed : new Date();
};
