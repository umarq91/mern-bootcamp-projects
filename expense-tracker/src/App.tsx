import { useClerk, useUser } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useAtom } from "jotai";
import {
  bankAccountAtom,
  cashAccountAtom,
  expensesAtom,
  incomeAtom,
} from "./jotai/store";
import { motion } from "framer-motion";

const App = () => {
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();
  const [cashAtom, setCashAmount] = useAtom(cashAccountAtom);
  const [bankAtom, setBankAmount] = useAtom(bankAccountAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [income, setIncome] = useAtom(incomeAtom);
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
      const { data: transactionsData, error: transactionsError } = await supabase
        .from("transactions")
        .select("*")
        .eq("userId", user.id);

      if (transactionsError) throw transactionsError;

      if (transactionsData) {
        const expenses = transactionsData.filter(
          (t) => t.type === "Expense"
        );
        const income = transactionsData.filter(
          (t) => t.type === "Income"
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

      const { data: existingBalance, error: fetchError } = await supabase
        .from("balance")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingBalance) {
        console.log("User already exists in Supabase:", existingBalance);
        return;
      }

      const { data, error } = await supabase
        .from("balance")
        .insert({ userId: user.id, cash: 0, bank: 0 });

      if (error) throw error;

      console.log("User initialized in Supabase:", data);
    } catch (error) {
      console.error("Error initializing user in Supabase:", error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      if (user && isSignedIn) {
        setIsLoading(true); // Start loading
        await initializeUserInSupabase();
        await fetchUserData();
        setIsLoading(false); // End loading
      }
    };
    initializeApp();
  }, [user, isSignedIn]);

  // Refetch when atoms change
  useEffect(() => {
    fetchUserData();
  }, [cashAtom, bankAtom, expenses, income]);

  return (
    <div className="font-poppins">
      {isLoading ? (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      ) : (
        <>
          <Navbar />
          <Dashboard />
        </>
      )}
    </div>
  );
};

export default App;
