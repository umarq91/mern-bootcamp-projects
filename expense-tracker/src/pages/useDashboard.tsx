import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  bankAccountAtom,
  cashAccountAtom,
  expensesAtom,
  incomeAtom,
} from "../jotai/store";

function useDashboard() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [IsActivityLogModalOpen, setIsActivityLogModalOpen] = useState(false);

  const [expense] = useAtom(cashAccountAtom);
  const [income] = useAtom(bankAccountAtom);

  const [expensesData] = useAtom(expensesAtom);
  const [incomeData] = useAtom(incomeAtom);

  return {
    isExpenseModalOpen,
    setIsExpenseModalOpen,
    isIncomeModalOpen,
    setIsIncomeModalOpen,
    IsActivityLogModalOpen,
    setIsActivityLogModalOpen,
    expense,
    income,
    expensesData,
    incomeData,
  };
}

export default useDashboard;
