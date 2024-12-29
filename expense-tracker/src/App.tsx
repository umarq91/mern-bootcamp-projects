import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { user, isSignedIn } = useUser();
  console.log(user);


  return (
    <div className="font-poppins">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
