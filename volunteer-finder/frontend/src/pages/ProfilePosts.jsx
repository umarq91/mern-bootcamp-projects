import axios from 'axios'
import React, { useEffect } from 'react'

function ProfilePosts() {

    useEffect(()=>{
        const getData=async()=>{
          const res =  await axios.get(`${import.meta.env.VITE_BACKEND}/events/posts`, { withCredentials: true })
        console.log(res);    
        }
        getData()
    },[])

  return (
    <div>ProfilePosts</div>
  )
}

export default ProfilePosts