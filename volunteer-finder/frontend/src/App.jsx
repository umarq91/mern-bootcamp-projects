import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import axios from "axios"
import {  AuthProvider } from './context/authContext'
import Navbar from './components/layout/Navbar'
import ProfilePage from "./pages/Proile/ProfilePage"
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/layout/Footer'
axios.defaults.withCredentials=true
function App() {

  return (
    <div>
    <AuthProvider>
    <Toaster />
      <BrowserRouter>
          <Navbar/>
      
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/sign-in' element={<LoginPage/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/profile'element={<ProfilePage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
    </div>
  )
}

export default App
