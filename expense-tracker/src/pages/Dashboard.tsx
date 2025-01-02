import TransactionModal from "../components/TransactionModal";
import Tabs from "../components/Tabs";
import TransactionLogs from "../components/Transactions";
import Balance from "../components/Balance";
import useDashboard from "./useDashboard";

function Dashboard() {
  const {
    isExpenseActivityLogModal,
    expense,
    income,
    setIsExpenseActivityLogModalOpen,
    setIsExpenseModalOpen,
    setIsIncomeActivityLogModalOpen,
    setIsIncomeModalOpen,
    isExpenseModalOpen,
    isIncomeModalOpen,
    expensesData,
    isIncomeActityLogModal,
    incomeData,
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
        setIsActivityLogModalOpen={setIsExpenseActivityLogModalOpen}
        setIsIncomeActivityLogModalOpen={setIsIncomeActivityLogModalOpen}
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
        closeModal={() => setIsExpenseActivityLogModalOpen(false)}
        isOpen={isExpenseActivityLogModal}
        data={expensesData}
      />

      <TransactionLogs
        closeModal={() => setIsIncomeActivityLogModalOpen(false)}
        isOpen={isIncomeActityLogModal}
        data={incomeData}
      />
    </div>
  );
}

export default Dashboard;
