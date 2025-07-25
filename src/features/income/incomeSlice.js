import { createTransactionSlice } from "@/features/transactions/createTransactionSlice";

const {
  reducer: incomeReducer,
  actions: {
    addTransaction: addIncome,
    getTransactions: getIncome,
    editTransaction: editIncome,
    deleteTransaction: deleteIncome,
    downloadTransactions: downloadIncome,
    reset: resetIncome,
  },
} = createTransactionSlice("income");

export {
  addIncome,
  getIncome,
  editIncome,
  deleteIncome,
  downloadIncome,
  resetIncome,
};

export default incomeReducer;
