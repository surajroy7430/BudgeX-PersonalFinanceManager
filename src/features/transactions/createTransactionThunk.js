import * as XLSX from "xlsx";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { parse } from "date-fns";

export const createTransactionThunk = (name) => {
  const collectionName = name; // income or expenses

  // Add Transaction
  const addTransaction = createAsyncThunk(
    `${collectionName}/add`,
    async (data, { rejectWithValue }) => {
      try {
        const user = getAuth().currentUser;
        const ref = collection(db, "users", user.uid, collectionName);
        const docRef = await addDoc(ref, data);

        return { id: docRef.id, ...data };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Get Transactions
  const getTransactions = createAsyncThunk(
    `${collectionName}/get`,
    async (_, { rejectWithValue }) => {
      try {
        const user = getAuth().currentUser;
        if(!user?.uid) throw new Error("User not authenticated");
        
        const ref = collection(db, "users", user.uid, collectionName);

        const snapshot = await getDocs(ref);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const parseDate = (dateStr) =>
          parse(dateStr, "dd MMM yyyy", new Date());

        const sorted = list.sort(
          (a, b) => parseDate(b.date) - parseDate(a.date)
        );

        return sorted;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Edit Transaction
  const editTransaction = createAsyncThunk(
    `${collectionName}/edit`,
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const user = getAuth().currentUser;
        const docRef = doc(db, "users", user.uid, collectionName, id);
        await updateDoc(docRef, updatedData);

        return { id: updatedData };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Delete Transaction
  const deleteTransaction = createAsyncThunk(
    `${collectionName}/delete`,
    async (id, { rejectWithValue }) => {
      try {
        const user = getAuth().currentUser;
        const docRef = doc(db, "users", user.uid, collectionName, id);
        await deleteDoc(docRef);

        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Download Transactions Data
  const downloadTransactions = createAsyncThunk(
    `${collectionName}/download`,
    async (_, { getState, rejectWithValue }) => {
      try {
        const user = getAuth().currentUser;
        const ref = collection(db, "users", user.uid, collectionName);

        const { items } = getState()[collectionName];

        const data =
          items.length > 0
            ? items
            : (await getDocs(ref)).docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

        if (!data || data.length === 0) {
          throw new Error(`No ${collectionName} data to export`);
        }

        const cleanedData = data.map(
          ({ source, category, amount, date, paymentMethod, description }) => {
            const label = source ? { SOURCE: source } : { CATEGORY: category };
            return {
              ...label,
              AMOUNT: amount,
              PAYMENT_METHOD: paymentMethod,
              DESCRIPTION: description,
              DATE: date,
            };
          }
        );

        // Convert JSON to worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(cleanedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, name.toUpperCase());

        // File Download
        XLSX.writeFile(workbook, `${collectionName}_details.xlsx`);

        return true;
      } catch (error) {
        console.error("Download Error:", error);
        return rejectWithValue(error.message);
      }
    }
  );

  return {
    addTransaction,
    getTransactions,
    editTransaction,
    deleteTransaction,
    downloadTransactions,
  };
};
