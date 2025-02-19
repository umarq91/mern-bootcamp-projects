/* eslint-disable */
import { atom } from "jotai";
import {  Transaction, TransactionPaload } from "../types";

// Store for Cash and Bank accounts
export const cashAccountAtom = atom(0);
export const bankAccountAtom = atom(0);
export const categoriesAtom = atom([
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Grocery",
  "Loan",
  "Rent",
  "Health",
  "Clothing",
  "Travel",
  "Savings",
  "Investments",
  "Other",
]);
export const expensesAtom = atom<Transaction[]>([]);
export const incomeAtom = atom<Transaction[]>([]);

export const addExpenseAtom = atom(null, (_, set, payload: TransactionPaload) => {
  const { category, amount, accountType, note } = payload;
  const expense = { category, amount, accountType, note };

  set(expensesAtom, (prev) => [...prev, expense]);

  if (accountType === "Cash") {
    set(cashAccountAtom, (prev) => prev - amount);
  } else {
    set(bankAccountAtom, (prev) => prev - amount);
  }
});

export const addIncomeAtom = atom(null, (_, set, payload: TransactionPaload) => {
  const { category, amount, accountType, note } = payload;
  const income = { category, amount, accountType, note };

  set(incomeAtom, (prev) => [...prev, income]); // Fixed: added income to `incomeAtom`

  if (accountType === "Cash") {
    set(cashAccountAtom, (prev) => prev + amount);
  } else {
    set(bankAccountAtom, (prev) => prev + amount);
  }
});
