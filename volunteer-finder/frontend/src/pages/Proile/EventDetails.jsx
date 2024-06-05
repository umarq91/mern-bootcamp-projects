import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUsers, FaCalendarAlt, FaClock,FaAddressBook } from 'react-icons/fa'

function EventDetails() {
    const { id } = useParams()
    const [event, setEvent] = useState({})

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND}/events/${id}`)
            setEvent(res.data)
        }
        getData()
    }, [id])

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <div className='min-h-screen font-poppins bg-gray-100'>
            <img
                className='w-full object-cover max-h-[500px]'
                src={event.thumbnail || "https://source.unsplash.com/random"} alt="" />

            <div className='max-w-7xl mx-auto bg-white shadow-lg mt-10 p-8 rounded-lg'>
                <h1 className='text-3xl lg:text-5xl font-semibold text-gray-900 mb-6'>
                    {event.title}
                </h1>

                <div className='max-w-6xl mx-auto flex flex-col gap-10'>
                    <p className='md:mt-6 leading-7 text-gray-600 font-montserrat font-semibold'>
                        {event.description}
                    </p>

                    <div className='bg-gray-100 p-6 rounded-lg shadow-inner flex flex-col gap-4'>
                        <p className='text-xl text-gray-900 font-semibold flex items-center'>
                            <FaUsers className='mr-2' />Volunteers Required: <span className='text-gray-700 ml-2'>{event.NumberOfVolunteer}</span>
                        </p>
                        <p className='text-xl text-gray-900 font-semibold flex items-center'>
                            <FaCalendarAlt className='mr-2' />Date: <span className='text-gray-700 ml-2'>{formatDate(event.date)}</span>
                        </p>
                        <p className='text-xl text-gray-900 font-semibold flex items-center'>
                            <FaClock className='mr-2' />Time: <span className='text-gray-700 ml-2'>{event.time}</span>
                        </p>
                        <p className='text-xl text-gray-900 font-semibold flex items-center'>
                            <FaAddressBook className='mr-2' />Address: <span className='text-gray-700 ml-2'>{event.address}</span>
                        </p>
                        <p className='text-xl text-gray-900 font-semibold flex items-center'>
                            <FaMapMarkerAlt className='mr-2' />Location: 
                            <Link to={event.location} target="_blank" className='text-blue-500 ml-2'>Click To Open Location</Link>
                        </p>
                    </div>

                    <div className='mt-10'>
                        <h1 className='text-3xl lg:text-4xl text-center text-gray-900 mb-4'>Contact Us</h1>
                        <p className='text-xl text-center text-gray-800 font-semibold flex justify-center items-center'>
                            <FaEnvelope className='mr-2' />Email: {event.contact?.email}
                        </p>
                        <p className='text-xl text-center text-gray-800 font-semibold flex justify-center items-center'>
                            <FaPhone className='mr-2' />Phone: {event.contact?.phone}
                        </p>
                    </div>

                    {/* {event.location && (
                        <div className='mt-10'>
                            <iframe
                                className='w-full h-64 rounded-lg'
                                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(event.location)}`}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default EventDetails
