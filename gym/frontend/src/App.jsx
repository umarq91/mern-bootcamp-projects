import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import UserInfo from './pages/UserInfo'
import Navbar from '../components/Navbar'
import AddMember from './pages/AddMember'
import PayFee from './pages/PayFee'


function App() {



  return (
<BrowserRouter>
<Navbar/>
    <Routes>
      
    <Route path='/' element={<HomePage/>}/>
    <Route path='/admin/user-info' element={<UserInfo/>}/>
    <Route path='/admin/add-member' element={<AddMember/>}/>
    <Route path='/admin/pay' element={<PayFee/>}/>




    </Routes>
</BrowserRouter>
  )
}

export default App
