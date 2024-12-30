import { atom } from "jotai";
import { TransactionPaload, Transaction } from "../types";

// Store for Cash and Bank accounts
export const cashAccountAtom = atom(0);
export const bankAccountAtom = atom(0);
export const categoriesAtom = atom([
  "Transport",
  "Entertainment",
  "Utilities",
  "Food",
  "Grocery",
  "Loan",
  "Rent",
  "Other",
  "Health",
  "Clothing",
  "Travel",
  "Savings",
  "Investments",
]);
export const expensesAtom = atom<Transaction[]>([]);
export const incomeAtom = atom<Transaction[]>([]);

export const addExpenseAtom = atom(
  null,
  (get, set, payload: TransactionPaload) => {
    const { category, amount, accountType, note } = payload;
    const expense = { category, amount, accountType, note };

    set(expensesAtom, (prev) => [...prev, expense]);

    if (accountType === "Cash") {
      set(cashAccountAtom, (prev) => prev - amount);
    } else {
      set(bankAccountAtom, (prev) => prev - amount);
    }
  }
);

export const addInComeAtom = atom(
  null,
  (get, set, payload: TransactionPaload) => {
    const { category, amount, accountType, note } = payload;
    const expense = { category, amount, accountType, note };

    set(expensesAtom, (prev) => [...prev, expense]);

    if (accountType === "Cash") {
      set(cashAccountAtom, (prev) => prev + amount);
    } else {
      set(bankAccountAtom, (prev) => prev + amount);
    }
  }
);

 