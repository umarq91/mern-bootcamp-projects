/* eslint-disable */
import { useUser } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import {
  bankAccountAtom,
  cashAccountAtom,
  expensesAtom,
  incomeAtom,
} from "../jotai/store";
import { supabase } from "../supabase";

type UserDataContextType = {
  fetchUserData: () => Promise<void>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [, setCashAmount] = useAtom(cashAccountAtom);
  const [, setBankAmount] = useAtom(bankAccountAtom);
  const [, setExpenses] = useAtom(expensesAtom);
  const [, setIncome] = useAtom(incomeAtom);

  const fetchUserData = async () => {
    try {
      if (!user?.id) return;

      // Fetch balance and transactions in parallel
      const [{ data: accountsData, error: accountsError }, { data: transactionsData, error: transactionsError }] =
        await Promise.all([
          supabase.from("balance").select("*").eq("userId", user.id).single(),
          supabase.from("transactions").select("*").eq("userId", user.id),
        ]);

      // Handle account balance data
      if (accountsError && accountsError.code !== "PGRST116") {
        console.error("Error fetching account balance:", accountsError.message);
      } else if (accountsData) {
        setCashAmount(accountsData.cash);
        setBankAmount(accountsData.bank);
      } else {
        // Insert default balance if not found
        const { error: insertError } = await supabase.from("balance").insert({
          userId: user.id,
          cash: 0,
          bank: 0,
        });

        if (insertError) {
          console.error("Error inserting default balance:", insertError.message);
        } else {
          console.log("Default balance added for user:", user.id);
          setCashAmount(0);
          setBankAmount(0);
        }
      }

      // Handle transactions data
      if (transactionsError) {
        console.error("Error fetching transactions:", transactionsError.message);
      } else if (transactionsData) {
        setExpenses(transactionsData.filter((t) => t.type === "Expense"));
        setIncome(transactionsData.filter((t) => t.type === "Income"));
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.id]);

  const contextValue = useMemo(() => ({ fetchUserData }), []);

  return <UserDataContext.Provider value={contextValue}>{children}</UserDataContext.Provider>;
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
