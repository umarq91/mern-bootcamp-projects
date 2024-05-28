import React,{useEffect, useState} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios"
import Posts from '../components/Posts'


function HomePage() {
  const {user} = useAuth()



  return (
    <div className='bg-gray-200 h-full '>
      <Posts/>
    </div>
  )
}

export default HomePage