import React,{useEffect, useState} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios"
import Posts from '../components/Posts'
import HeroSection from '../components/Hero'
import Option from '../components/Option'


function HomePage() {
  const {user} = useAuth()



  return (
    
    <div className=' h-full '>
      <HeroSection/>
      <Option/>
      <Posts/>
    </div>
  )
}

export default HomePage