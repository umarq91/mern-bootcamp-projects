/* eslint-disable */
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { UserDataProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserDataProvider>
      <div className="font-poppins">
        <Navbar />
        <Dashboard />
      </div>
    </UserDataProvider>
  );
};

export default App;
