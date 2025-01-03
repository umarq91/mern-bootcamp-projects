import { useState } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaMoneyBillWave, FaExchangeAlt } from "react-icons/fa";
import { useAtom } from "jotai";
import { bankAccountAtom, cashAccountAtom } from "../jotai/store";
import { transferBalance } from "../api/Transaction";
import { useClerk } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useUserData } from "../context/UserContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TransferModal = ({ isOpen, onClose }: Props) => {
  const [transferType, setTransferType] = useState<"bankToCash" | "cashToBank">(
    "bankToCash"
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [cashAmount, setCashAmount] = useAtom(cashAccountAtom);
  const [bankAmount, setBankAmount] = useAtom(bankAccountAtom);
  const { user } = useClerk();
  const {fetchUserData} = useUserData();

  const handleSubmit = async () => {
    if (transferType === "bankToCash") {
      if (bankAmount < Number(amount)) {
        alert("Insufficient balance");
        return;
      } else {
        await transferBalance(user?.id!, "bankToCash", Number(amount));
        fetchUserData();
        toast.success("Transfer successful", { position: "top-center" });
      }
    }

    if (transferType === "cashToBank") {
      if (cashAmount < Number(amount)) {
        alert("Insufficient balance");
        return;
      } else {
        await transferBalance(user?.id!, "CashToBank", Number(amount));
        fetchUserData();
        toast.success("Transfer successful", { position: "top-center" });
      }
    }
    onClose();
  };

  const handleSwap = () => {
    setTransferType((prev) =>
      prev === "bankToCash" ? "cashToBank" : "bankToCash"
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-lg shadow-lg w-[600px] p-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Transfer Money</h2>
        <div className="flex justify-between items-center mb-8">
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              transferType === "bankToCash"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setTransferType("bankToCash")}
          >
            <FaUniversity /> Bank to Cash
          </button>
          <motion.button
            className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
          >
            <FaExchangeAlt className="text-xl text-blue-500" />
          </motion.button>
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              transferType === "cashToBank"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setTransferType("cashToBank")}
          >
            <FaMoneyBillWave /> Cash to Bank
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <motion.button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          Transfer
        </motion.button>
        <button
          className="w-full mt-4 text-gray-600 underline text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default TransferModal;
