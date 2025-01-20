import { useAtom } from "jotai";
import { useState } from "react";
import {
  bankAccountAtom,
  cashAccountAtom,
  expensesAtom,
  incomeAtom,
} from "../jotai/store";

function useDashboard() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

  const [isExpenseActivityLogModal, setIsExpenseActivityLogModalOpen] =
    useState(false);
  const [isIncomeActityLogModal, setIsIncomeActivityLogModalOpen] =
    useState(false);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const [expense] = useAtom(cashAccountAtom);
  const [income] = useAtom(bankAccountAtom);

  const [expensesData] = useAtom(expensesAtom);
  const [incomeData] = useAtom(incomeAtom);

  return {
    isExpenseModalOpen,
    setIsExpenseModalOpen,
    isIncomeModalOpen,
    setIsIncomeModalOpen,
    isExpenseActivityLogModal,
    setIsExpenseActivityLogModalOpen,
    isIncomeActityLogModal,
    setIsIncomeActivityLogModalOpen,
    isTransferModalOpen,
    setIsTransferModalOpen,
    expense,
    income,
    expensesData,
    incomeData,
  };
}

export default useDashboard;
