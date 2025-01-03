import React, { createContext, useContext, useState, useEffect } from "react";

type Transaction = {
  category: string;
  amount: number;
  accountType: "Cash" | "Bank";
  note: string;
};

type UserDataContextType = {
  cash: number;
  bank: number;
  expenses: Transaction[];
  income: Transaction[];
  addExpense: (payload: Transaction) => void;
  addIncome: (payload: Transaction) => void;
  fetchUserData: () => Promise<void>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cash, setCash] = useState(0);
  const [bank, setBank] = useState(0);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<Transaction[]>([]);

  const fetchUserData = async () => {
    console.log("Called");
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

  const addExpense = (payload: Transaction) => {
    setExpenses((prev) => [...prev, payload]);
    if (payload.accountType === "Cash") {
      setCash((prev) => prev - payload.amount);
    } else {
      setBank((prev) => prev - payload.amount);
    }
  };

  const addIncome = (payload: Transaction) => {
    setIncome((prev) => [...prev, payload]);
    if (payload.accountType === "Cash") {
      setCash((prev) => prev + payload.amount);
    } else {
      setBank((prev) => prev + payload.amount);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        cash,
        bank,
        expenses,
        income,
        addExpense,
        addIncome,
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
