import { createTransactionSlice } from "@/features/transactions/createTransactionSlice";

const {
  reducer: expenseReducer,
  actions: {
    addTransaction: addExpense,
    getTransactions: getExpenses,
    editTransaction: editExpense,
    deleteTransaction: deleteExpense,
    downloadTransactions: downloadExpenses,
    reset: resetExpenses,
  },
} = createTransactionSlice("expenses");

export {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  downloadExpenses,
  resetExpenses,
};

export default expenseReducer;
