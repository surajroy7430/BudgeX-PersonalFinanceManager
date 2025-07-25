import { BanknoteArrowDown, BanknoteArrowUp, Wallet } from "lucide-react";

export const BALANCE_SUMMARY = [
  {
    id: "totalBalance",
    icon: Wallet,
    label: "Total Balance",
    color: "bg-primary",
  },
  {
    id: "totalIncome",
    icon: BanknoteArrowDown,
    label: "Total Income",
    color: "bg-emerald-600",
  },
  {
    id: "totalExpenses",
    icon: BanknoteArrowUp,
    label: "Total Expenses",
    color: "bg-orange-600",
  },
];

export const CATEGORIES_OPTIONS = [
  { value: "Groceries" },
  { value: "House & Rent" },
  { value: "Utilities" },
  { value: "Dining & Restaurants" },
  { value: "Entertainment" },
  { value: "Grooming" },
  { value: "Healthcare" },
  { value: "Insurance" },
  { value: "Education" },
  { value: "Shopping" },
  { value: "Travel" },
  { value: "Loan EMI" },
  { value: "Credit Card Payment" },
  { value: "Investment Loss" },
  { value: "Bill Payment" },
  { value: "Transportation" },
  { value: "Subscriptions" },
  { value: "Taxes" },
  { value: "Other" },
];

export const SOURCE_OPTIONS = [
  { value: "Salary" },
  { value: "Freelance" },
  { value: "Interest" },
  { value: "Rental Income" },
  { value: "Investment Gains" },
  { value: "Bonus" },
  { value: "Gift" },
  { value: "Business" },
  { value: "Scholarship" },
  { value: "Pension" },
  { value: "Other" },
];

export const PAYMENT_METHODS = [
  { value: "Card", label: "Credit/Debit Card" },
  { value: "Auto Debit", label: "Auto Debit" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cheque", label: "Cheque" },
  { value: "Wallet", label: "Wallet" },
  { value: "UPI", label: "UPI" },
  { value: "Cash", label: "Cash" },
  { value: "Other", label: "Other" },
];

export const RANGE_OPTIONS = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export const RANGE_OPTIONS_MAP = [
  {
    value: "90d",
    label: "Last 3 Months",
  },
  {
    value: "30d",
    label: "Last 30 Days",
  },
  {
    value: "7d",
    label: "Last 7 Days",
  },
];

export const MENU_MAP = {
  "/dashboard": "Dashboard",
  "/income": "Income",
  "/expenses": "Expense",
  "/appearance": "Appearance",
  "/goals": "Goals",
};
