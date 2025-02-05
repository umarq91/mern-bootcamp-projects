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
import Trainer from './pages/Trainer'
import BMICalculator from './pages/BMICalculator'
import SendMessage from './pages/SendMessage'


function App() {



  return (
<BrowserRouter>
<Navbar/>
    <Routes>
      
    <Route path='/' element={<HomePage/>}/>
    <Route path='/admin/user-info' element={<UserInfo/>}/>
    <Route path='/admin/add-member' element={<AddMember/>}/>
    <Route path='/admin/pay' element={<PayFee/>}/>
    <Route path='/admin/trainer' element={<Trainer/>}/>
    <Route path='/admin/bmi' element={<BMICalculator/>}/>
    <Route path='/admin/annoucements' element={<SendMessage/>}/>







    </Routes>
</BrowserRouter>
  )
}

export default App
