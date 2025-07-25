import { createSlice } from "@reduxjs/toolkit";
import { createTransactionThunk } from "@/features/transactions/createTransactionThunk";

export const createTransactionSlice = (name) => {
  const {
    addTransaction,
    getTransactions,
    editTransaction,
    deleteTransaction,
    downloadTransactions,
  } = createTransactionThunk(name);

  const collectionSlice = createSlice({
    name,
    initialState: {
      items: [],
      loading: false,
      error: null,
      totalAmount: 0,
      downloaded: false,
    },
    reducers: {
      reset: (state) => {
        (state.items = []),
          (state.loading = false),
          (state.error = null),
          (state.totalAmount = 0),
          (state.downloaded = false);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addTransaction.fulfilled, (state, action) => {
          state.items.push(action.payload);
          const amt = Number(action.payload.amount);

          if (!isNaN(amt)) state.totalAmount += amt;
        })
        .addCase(getTransactions.fulfilled, (state, action) => {
          state.items = action.payload;

          state.totalAmount = action.payload.reduce((sum, item) => {
            const amt = parseFloat(item.amount);

            return sum + (isNaN(amt) ? 0 : amt);
          }, 0);
        })
        .addCase(editTransaction.fulfilled, (state, action) => {
          const { id, updatedData } = action.payload;

          const index = state.items.findIndex((item) => item.id === id);

          if (index !== -1) {
            const oldAmt = Number(state.items[index].amount);
            const newAmt = Number(updatedData.amount);

            if (!isNaN(oldAmt) && !isNaN(newAmt)) {
              state.totalAmount += newAmt - oldAmt;
            }

            state.items[index] = {
              ...state.items[index],
              ...updatedData,
            };
          }
        })
        .addCase(deleteTransaction.fulfilled, (state, action) => {
          const deleted = state.items.find(
            (item) => item.id === action.payload
          );

          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );

          const amt = Number(deleted?.amount);

          if (!isNaN(amt)) state.totalAmount -= amt;
        })
        .addCase(downloadTransactions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(downloadTransactions.fulfilled, (state) => {
          state.loading = false;
          state.downloaded = true;
        })
        .addCase(downloadTransactions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  return {
    reducer: collectionSlice.reducer,
    actions: {
      addTransaction,
      getTransactions,
      editTransaction,
      deleteTransaction,
      downloadTransactions,
      reset: collectionSlice.actions.reset,
    },
  };
};
