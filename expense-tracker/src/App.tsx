import { useClerk, useUser } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { supabase } from "./supabase";
import { useAtom } from "jotai";
import {
  bankAccountAtom,
  cashAccountAtom,
  expensesAtom,
  incomeAtom,
} from "./jotai/store";
import { Transaction } from "./types";

const App = () => {
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();
  const [cashAtom, setCashAmount] = useAtom(cashAccountAtom);
  const [bankAtom, setBankAmount] = useAtom(bankAccountAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [income, setIncome] = useAtom(incomeAtom);

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
        // Log error unless it's "no rows returned" (code: PGRST116)
        console.error("Error fetching account balance:", accountsError);
        return;
      }

      if (accountsData) {
        setCashAmount(accountsData.cash);
        setBankAmount(accountsData.bank);
      }

      // Fetch transaction history
      const { data: transactionsData, error: transactionsError } = await supabase
        .from("transactions")
        .select("*")
        .eq("userId", user.id);

      if (transactionsError) throw transactionsError;

      if (transactionsData) {
        const expenses = transactionsData.filter(
          (t: Transaction) => t.type === "Expense"
        );
        const income = transactionsData.filter(
          (t: Transaction) => t.type === "Income"
        );
        setExpenses(expenses);
        setIncome(income);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  const initializeUserInSupabase = async () => {
    try {
      if (!user?.id) return;

      // Insert or update the user's balance with defaults if it doesn't exist
      const { data, error } = await supabase
        .from("balance")
        .upsert({ userId: user.id, cash: 0, bank: 0 },{onConflict: 'userId'});

      if (error) throw error;

      console.log("User initialized in Supabase:", data);
    } catch (error) {
      console.error("Error initializing user in Supabase:", error);
    }
  };

  useEffect(() => {
    if (user && isSignedIn) {
      // Ensure the user has a default entry in Supabase
      initializeUserInSupabase();

      // Fetch user-specific data
      fetchUserData();
    }
  }, [user, isSignedIn]);

  return (
    <div className="font-poppins">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
