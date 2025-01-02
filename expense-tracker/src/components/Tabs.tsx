import React from "react";
import Tab from "./Tab";

type Props = {
  setIsExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIncomeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActivityLogModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Tabs({ setIsExpenseModalOpen, setIsIncomeModalOpen,setIsActivityLogModalOpen }: Props) {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-20">
      <Tab
        onClick={() => setIsExpenseModalOpen(true)}
        className="group bg-red-300"
      >
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition duration-200">
          <span className="text-indigo-600 text-3xl font-bold group-hover:text-indigo-800">
            +
          </span>
          <p className="text-lg font-medium text-gray-700">Add Expense</p>
        </div>
      </Tab>
      <Tab onClick={() => setIsIncomeModalOpen(true)} className="bg-orange-300">
        <div className="bg-white shadow-md  rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition duration-200 bg-red-400">
          <span className="text-indigo-600 text-3xl font-bold">+</span>
          <p className="text-lg font-medium text-gray-700">Add Income</p>
        </div>
      </Tab>
      {/* <Tab className="bg-yellow-300">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition duration-200">
          <span className="text-indigo-600 text-3xl font-bold">📂</span>
          <p className="text-lg font-medium text-gray-700">Categories</p>
        </div>
      </Tab> */}
      <Tab
      onClick={()=>setIsActivityLogModalOpen(true)}
      className="bg-pink-400">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition duration-200">
          <span className="text-indigo-600 text-3xl font-bold">📋</span>
          <p className="text-lg font-medium text-gray-700">Transaction Logs</p>
        </div>
      </Tab>
      {/* <Tab
      onClick={()=>setIsActivityLogModalOpen(true)}
      className="bg-orange-700">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition duration-200">
          <span className="text-indigo-600 text-3xl font-bold">📋</span>
          <p className="text-lg font-medium text-gray-700">Income Logs</p>
        </div>
      </Tab> */}
    </div>
  );
}

export default Tabs;
