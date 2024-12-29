export type AccountType = "Cash" | "Bank";

export interface Transaction {
  category: string;
  amount: number;
  type: AccountType;
  note?: string;
}

export interface TransactionPaload {
  category: string;
  amount: number;
  type: AccountType;
  note?: string;
}
