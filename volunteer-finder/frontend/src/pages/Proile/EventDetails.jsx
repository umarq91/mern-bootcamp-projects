import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EventDetails() {
    const {id} = useParams()
    const [event,setEvent] = useState([])

    useEffect(()=>{
        const getData=async()=>{
            const res =  await axios.get(`${import.meta.env.VITE_BACKEND}/events/${id}`)
            setEvent(res.data)
        }
        getData()
    },[])


  return (
    <div className='h-screen'>
        <img 
        className='w-full object-cover max-h-[500px]'
        src={event.thumbnail || "https://source.unsplash.com/random"} alt="" />
    </div>
  )
}

export default EventDetails