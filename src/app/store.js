import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import incomeReducer from "../features/income/incomeSlice";
import expenseReducer from "../features/expenses/expenseSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expenseReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
