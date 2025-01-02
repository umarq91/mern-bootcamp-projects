import TransactionModal from "../components/TransactionModal";
import Tabs from "../components/Tabs";
import TransactionLogs from "../components/Transactions";
import Balance from "../components/Balance";
import useDashboard from "./useDashboard";


function Dashboard() {
  const {
    IsActivityLogModalOpen,
    expense,
    income,
    setIsActivityLogModalOpen,
    setIsExpenseModalOpen,
    setIsIncomeModalOpen,
    isExpenseModalOpen,
    isIncomeModalOpen,
    expensesData,
    incomeData
  } = useDashboard();


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Balance Section */}
      <Balance
        expense={expense}
        income={income}
        setIsExpenseModalOpen={setIsExpenseModalOpen}
      />

      {/* Tabs Section */}
      <Tabs
        setIsExpenseModalOpen={setIsExpenseModalOpen}
        setIsIncomeModalOpen={setIsIncomeModalOpen}
        setIsActivityLogModalOpen={setIsActivityLogModalOpen}
      />

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
        closeModal={() => setIsActivityLogModalOpen(false)}
        isOpen={IsActivityLogModalOpen}
        expenseData={expensesData}
        incomeData={incomeData}
      />

      
    </div>
  );
}

export default Dashboard;
