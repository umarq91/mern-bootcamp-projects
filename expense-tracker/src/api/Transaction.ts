import { supabase } from "../supabase";
import { Transaction } from "../types";

export const addTransactionApi = async (data: Transaction, userId: string) => {
  try {
    // Insert transaction
    const { data: transactionResponse, error: transactionError } =
      await supabase.from("transactions").insert({ ...data, userId });

    if (transactionError) {
      console.error("Error inserting transaction:", transactionError);
      throw transactionError;
    }

    // Fetch user balance
    const { data: accountData, error: accountError } = await supabase
      .from("balance")
      .select("cash, bank")
      .eq("userId", userId)
      .single();

    if (accountError) {
      console.error("Error fetching user balance:", accountError);
      throw accountError;
    }

    if (!accountData) {
      throw new Error("Account data not found");
    }

    // Calculate new balance
    let updatedBalance;
    if (data.type === "Expense") {
      updatedBalance =
        data.accountType === "Cash"
          ? { cash: accountData.cash - data.amount }
          : { bank: accountData.bank - data.amount };
    } else {
      updatedBalance =
        data.accountType === "Cash"
          ? { cash: accountData.cash + data.amount }
          : { bank: accountData.bank + data.amount };
    }

    // Update user balance
    const { data: balanceResponse, error: balanceError } = await supabase
      .from("balance")
      .update(updatedBalance)
      .eq("userId", userId);

    if (balanceError) {
      console.error("Error updating user balance:", balanceError);
      throw balanceError;
    }

    return {
      transaction: transactionResponse,
      updatedBalance: balanceResponse,
    };
  } catch (error) {
    console.error("Error in addTransactionApi:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
