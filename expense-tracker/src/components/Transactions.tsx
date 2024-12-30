import React, { useState } from "react";
import { motion } from "framer-motion";
import { Transaction } from "../types";


interface Props {
  isOpen: boolean;
  closeModal: () => void;
  incomeData: Transaction[];
  expenseData: Transaction[];
}

const TransactionLogs = ({
  isOpen,
  closeModal,
  incomeData,
  expenseData,
}: Props) => {
  const [activeTab, setActiveTab] = useState("Expenses");

  if (!isOpen) return null;

  const transactions = activeTab === "Income" ? incomeData : expenseData;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 space-y-6 transform transition-all"
        initial={{ y: "-50px" }}
        animate={{ y: 0 }}
        exit={{ y: "50px" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &#x2715;
          </button>
        </div>

        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 text-lg font-medium py-3 text-center transition-all duration-200 border-b-2 ${
              activeTab === "Expenses"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Expenses")}
          >
            Expenses
          </button>
          <button
            className={`flex-1 text-lg font-medium py-3 text-center transition-all duration-200 border-b-2 ${
              activeTab === "Income"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Income")}
          >
            Income
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Category
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">Amount</th>
                <th className="px-6 py-4 font-medium text-gray-900">Account type</th>
                <th className="px-6 py-4 font-medium text-gray-900">Note</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">{transaction.category}</td>
                    <td className="px-6 py-4">{transaction.amount}</td>
                    <td className="px-6 py-4">{transaction.accountType}</td>
                    <td className="px-6 py-4">{transaction.note || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No transactions to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TransactionLogs;
