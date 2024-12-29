import { useState } from "react";
import Tab from "../components/Tab";
import { useAtom } from "jotai";
import { bankAccountAtom, cashAccountAtom, expensesAtom } from "../jotai/store";
import TransactionModal from "../components/TransactionModal";
import Tabs from "../components/Tabs";
import TransactionLogs from "../components/Transactions";

type Props = {};

function Dashboard({}: Props) {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [ActivityLog, setActivityLog] = useState(false);

  const [expense] = useAtom(cashAccountAtom);
  const [income] = useAtom(bankAccountAtom);

  const [expenses] = useAtom(expensesAtom);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-white">
          Expense Tracker
        </h1>
      </header>

      {/* Balance Section */}
      <div className="py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Total Balance */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-500">
                Total Balance
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                PKR {expense + income}
              </p>
            </div>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Add Expense
            </button>
          </div>

          {/* Detailed Balances */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Cash Balance
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                PKR {expense}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Bank Balance
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                PKR {income}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        setIsExpenseModalOpen={setIsExpenseModalOpen}
        setIsIncomeModalOpen={setIsIncomeModalOpen}
        setIsActivityLogModalOpen={setActivityLog}
      />

      {/* Expense Modal */}
      <TransactionModal
        isOpen={isExpenseModalOpen}
        closeModal={() => setIsExpenseModalOpen(false)}
        type="Expense"
      />
      <TransactionModal
        isOpen={isIncomeModalOpen}
        closeModal={() => setIsIncomeModalOpen(false)}
        type="Income"
      />

      <TransactionLogs
        closeModal={() => setActivityLog(false)}
        isOpen={ActivityLog}
        expenseData={expenses}
        incomeData={[]}
      />
    </div>
  );
}

export default Dashboard;
