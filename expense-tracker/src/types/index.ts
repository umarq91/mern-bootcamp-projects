export type AccountType = "Cash" | "Bank";

export interface Transaction {
  category: string;
  amount: number;
  accountType: AccountType;
  type?: "Income" | "Expense";
  note?: string;
}

export interface TransactionPaload {
  category: string;
  amount: number;
  accountType: AccountType;
  type?: "Income" | "Expense";
  note?: string;
}
