import { atom } from "jotai";
import { TransactionPaload, Transaction } from "../types";

// Store for Cash and Bank accounts
export const cashAccountAtom = atom(3000);
export const bankAccountAtom = atom(5000);
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
    const { category, amount, type, note } = payload;
    const expense = { category, amount, type, note };

    set(expensesAtom, (prev) => [...prev, expense]);

    if (type === "Cash") {
      set(cashAccountAtom, (prev) => prev - amount);
    } else {
      set(bankAccountAtom, (prev) => prev - amount);
    }
  }
);

export const addInComeAtom = atom(
  null,
  (get, set, payload: TransactionPaload) => {
    const { category, amount, type, note } = payload;
    const expense = { category, amount, type, note };

    set(expensesAtom, (prev) => [...prev, expense]);

    if (type === "Cash") {
      set(cashAccountAtom, (prev) => prev + amount);
    } else {
      set(bankAccountAtom, (prev) => prev + amount);
    }
  }
);

console.log(expensesAtom);
