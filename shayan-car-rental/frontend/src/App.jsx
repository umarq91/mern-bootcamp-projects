import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home"
import AdminDashboard from './pages/AdminDashboard';
import CarList from './pages/CarList';
import AdminLogin from './pages/Login';
import { AuthProvider } from './Context/userContext';
import Navbar from './components/Navbar';
import AddCar from './pages/AddCar';
function App() {

  return (
<>
<BrowserRouter>
<AuthProvider>
<Navbar/>
<Routes>
<Route  path='/' element={<Home/>} />
<Route  path='/cars' element={<CarList/>} />
<Route  path='/admin/login' element={<AdminLogin/>} />
<Route  path='/admin/add' element={<AddCar/>} />
<Route  path='/admin/dashboard' element={<AdminDashboard/>} />

</Routes>

</AuthProvider>

</BrowserRouter>
</>
  )
}

export default App
