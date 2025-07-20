import * as XLSX from "xlsx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { parse } from "date-fns";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const ref = collection(db, "users", user.uid, "expenses");
      const docRef = await addDoc(ref, expenseData);
      return { id: docRef.id, ...expenseData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getExpenses = createAsyncThunk(
  "expense/getExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const ref = collection(db, "users", user.uid, "expenses");
      const snapshot = await getDocs(ref);
      const expensesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const parseDate = (dateStr) => parse(dateStr, "dd MMM yyyy", new Date());

      const sortedExpenses = expensesList.sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );

      return sortedExpenses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id, { rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const docRef = doc(db, "users", user.uid, "expenses", id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downloadExpenses = createAsyncThunk(
  "income/downloadExpenses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const ref = collection(db, "users", user.uid, "expenses");

      const { items } = getState().expenses;
      const expensesData =
        items.length > 0
          ? items
          : (await getDocs(ref)).docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

      if (!expensesData || expensesData.length === 0) {
        throw new Error("No income data to export");
      }

      const cleanedData = expensesData.map(({ category, amount, date }) => ({
        Category: category,
        Amount: amount,
        Date: date,
      }));

      // Convert JSON to worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(cleanedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

      // File Download
      XLSX.writeFile(workbook, "expenses_details.xlsx");
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalExpenses: 0,
    downloaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
        const amt = Number(action.payload.amount);
        if (!isNaN(amt)) state.totalExpenses += amt;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalExpenses = action.payload.reduce((sum, item) => {
          const amt = parseFloat(item.amount);
          return sum + (isNaN(amt) ? 0 : amt);
        }, 0);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const deleted = state.items.find((item) => item.id === action.payload);
        state.items = state.items.filter((item) => item.id !== action.payload);
        const amt = Number(deleted?.amount);
        if (!isNaN(amt)) state.totalExpenses -= amt;
      })
      .addCase(downloadExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadExpenses.fulfilled, (state) => {
        state.loading = false;
        state.downloaded = true;
      })
      .addCase(downloadExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
