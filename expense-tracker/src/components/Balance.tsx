type Props = {
  expense: number;
  income: number;
  setIsExpenseModalOpen: (value: boolean) => void;
};

function Balance({ expense, income, setIsExpenseModalOpen }: Props) {
  return (
    <div className="py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Total Balance */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-500">Total Balance</h2>
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
            <h3 className="text-sm font-medium text-gray-500">Cash Balance</h3>
            <p className="text-lg font-semibold text-gray-800">PKR {expense}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Bank Balance</h3>
            <p className="text-lg font-semibold text-gray-800">PKR {income}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
