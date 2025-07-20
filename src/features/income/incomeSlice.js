import * as XLSX from "xlsx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { doc, addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { parse } from "date-fns";

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData, { rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const ref = collection(db, "users", user.uid, "income");
      const docRef = await addDoc(ref, incomeData);
      return { id: docRef.id, ...incomeData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getIncome = createAsyncThunk(
  "income/getIncome",
  async (_, { rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const ref = collection(db, "users", user.uid, "income");
      const snapshot = await getDocs(ref);
      const incomeList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const parseDate = (dateStr) => parse(dateStr, "dd MMM yyyy", new Date());

      const sortedIncome = incomeList.sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );

      return sortedIncome;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id, { rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const docRef = doc(db, "users", user.uid, "income", id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downloadIncome = createAsyncThunk(
  "income/downloadIncome",
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = getAuth().currentUser;
      const ref = collection(db, "users", user.uid, "income");

      const { items } = getState().income;
      const incomeData =
        items.length > 0
          ? items
          : (await getDocs(ref)).docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

      if (!incomeData || incomeData.length === 0) {
        throw new Error("No income data to export");
      }

      const cleanedData = incomeData.map(({ source, amount, date }) => ({
        Source: source,
        Amount: amount,
        Date: date,
      }));

      // Convert JSON to worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(cleanedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Income");

      // File Download
      XLSX.writeFile(workbook, "income_details.xlsx");
      return true;
    } catch (error) {
      console.error("Download Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalIncome: 0,
    downloaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIncome.fulfilled, (state, action) => {
        state.items.push(action.payload);
        const amt = Number(action.payload.amount);
        if (!isNaN(amt)) state.totalIncome += amt;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalIncome = action.payload.reduce((sum, item) => {
          const amt = parseFloat(item.amount);
          return sum + (isNaN(amt) ? 0 : amt);
        }, 0);
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        const deleted = state.items.find((item) => item.id === action.payload);
        state.items = state.items.filter((item) => item.id !== action.payload);
        const amt = Number(deleted?.amount);
        if (!isNaN(amt)) state.totalIncome -= amt;
      })
      .addCase(downloadIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadIncome.fulfilled, (state) => {
        state.loading = false;
        state.downloaded = true;
      })
      .addCase(downloadIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default incomeSlice.reducer;
