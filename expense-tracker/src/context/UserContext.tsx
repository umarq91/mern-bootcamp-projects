import { useUser } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  bankAccountAtom,
  cashAccountAtom,
  expensesAtom,
  incomeAtom,
} from "../jotai/store";
import { supabase } from "../supabase";

type Transaction = {
  category: string;
  amount: number;
  accountType: "Cash" | "Bank";
  note: string;
};

type UserDataContextType = {
  //   cash: number;
  //   bank: number;
  //   expenses: Transaction[];
  //   income: Transaction[];

  fetchUserData: () => Promise<void>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);
// TODO : rplace everything in project with this context value
export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isSignedIn } = useUser();
  const [cashAtom, setCashAmount] = useAtom(cashAccountAtom);
  const [bankAtom, setBankAmount] = useAtom(bankAccountAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [income, setIncome] = useAtom(incomeAtom);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      if (!user?.id) return;

      // Fetch account balances
      const { data: accountsData, error: accountsError } = await supabase
        .from("balance")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (accountsError && accountsError.code !== "PGRST116") {
        console.error("Error fetching account balance:", accountsError);
        return;
      }

      if (accountsData) {
        setCashAmount(accountsData.cash);
        setBankAmount(accountsData.bank);
      }

      // Fetch transaction history
      const { data: transactionsData, error: transactionsError } =
        await supabase.from("transactions").select("*").eq("userId", user.id);

      if (transactionsError) throw transactionsError;

      if (transactionsData) {
        const expenses = transactionsData.filter((t) => t.type === "Expense");
        const income = transactionsData.filter((t) => t.type === "Income");
        setExpenses(expenses);
        setIncome(income);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        fetchUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};