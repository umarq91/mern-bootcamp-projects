/* Updated TransactionModal component */
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  addExpenseAtom,
  addIncomeAtom,
  categoriesAtom,
} from "../jotai/store";
import { AccountType } from "../types";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { addTransactionApi } from "../api/Transaction";
import { useUser } from "@clerk/clerk-react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  type: "Expense" | "Income";
}

const TransactionModal = ({ isOpen, closeModal, type }: Props) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Food"); // Default category
  const [accountType, setAccountType] = useState<AccountType>("Cash");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const [categories] = useAtom(categoriesAtom);
  const [_, addExpense] = useAtom(addExpenseAtom);
  const [__, addIncome] = useAtom(addIncomeAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    if (!user || !user.id) return;

 
    addTransactionApi(
      {
        amount,
        accountType,
        type,
        category,
        note: description,
      },
      user?.id
    ).then(() => {
      if (type === "Expense") {
        addExpense({ category, amount, accountType, note: description });
      } else {
        addIncome({ category, amount, accountType, note: description });
      }
    });

    toast.success(`${type} added successfully`, {
      position: "bottom-right",
    });

    setAmount(0);
    setCategory("Food");
    setDescription("");
    closeModal();
  };

  const handleSuggestedCategoryClick = (cat: string) => {
    setCategory(cat);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6 transform transition-all"
        initial={{ y: "-50px" }}
        animate={{ y: 0 }}
        exit={{ y: "50px" }}
      >
        <h2 className="text-2xl font-bold text-gray-900">{`Add ${type}`}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder={`Enter ${type.toLowerCase()} amount`}
              required
            />
          </div>

          {/* Category */}
          <div>
            {/* <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select> */}

            {/* Suggested Categories */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">
                Suggested Categories:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSuggestedCategoryClick(cat)}
                    className={`px-3 py-1 rounded-full border text-xs ${
                      category === cat
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } hover:bg-indigo-400 hover:text-white transition`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Account Type
            </label>
            <div className="flex items-center space-x-6 mt-4">
              <label className="flex items-center text-lg font-medium text-gray-800">
                <input
                  type="radio"
                  name="accountType"
                  value="Cash"
                  checked={accountType === "Cash"}
                  onChange={() => setAccountType("Cash")}
                  className="focus:ring-indigo-500 text-indigo-600"
                />
                <span className="ml-2">Cash</span>
              </label>
              <label className="flex items-center text-lg font-medium text-gray-800">
                <input
                  type="radio"
                  name="accountType"
                  value="Bank"
                  checked={accountType === "Bank"}
                  onChange={() => setAccountType("Bank")}
                  className="focus:ring-indigo-500 text-indigo-600"
                />
                <span className="ml-2">Bank</span>
              </label>
            </div>
          </div>

          {/* Note or Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Note/Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Describe what this transaction is about"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 text-lg font-medium text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add {type}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TransactionModal;
