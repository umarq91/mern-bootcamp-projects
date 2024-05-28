import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import axios from "axios"
import {  AuthProvider } from './context/authContext'
import ProfilePosts from './pages/ProfilePosts'
import Navbar from './components/layout/Navbar'
import ProfilePage from "./pages/Proile/ProfilePage"

axios.defaults.withCredentials=true
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <AuthProvider>
      <BrowserRouter>
          <Navbar/>
      
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/sign-in' element={<LoginPage/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/profile'element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  )
}

export default App
