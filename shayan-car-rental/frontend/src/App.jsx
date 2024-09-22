import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from './pages/AdminDashboard';
import CarList from './pages/CarList';
import AdminLogin from './pages/Login';
import { AuthProvider } from './Context/userContext';
import Navbar from './components/Navbar';
import AddCar from './pages/AddCar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cars' element={<CarList />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            
            {/* Protecting Admin Routes */}
            <Route 
              path='/admin/add' 
              element={
                <ProtectedRoute>
                  <AddCar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/admin/dashboard' 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
