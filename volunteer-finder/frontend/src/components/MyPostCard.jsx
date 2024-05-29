import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MyUploadsCard = ({ post }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="block relative mt-10 w-[90%]  h-auto shadow hover:cursor-pointer overflow-hidden rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:scale-105 transition transform ease-in">
    
        <div key={post.id}>
          <div className="content p-2">
            <div className="pt-2 h-16">
              <h5 className="mb-2 text-xl font-bold font-poppins line-clamp-2 text-neutral-800 dark:text-neutral-50">
                {post.title || 'Title'}
              </h5>
            </div>
            <p className="text-base font-light text-neutral-600 text-green-600 font-poppins dark:text-neutral-200 text-sm">
              Date/Time: <span className="text-lg">{new Date(post.date).toLocaleDateString()} {post.time}</span>
            </p>
            <p className="text-base font-light text-neutral-600 text-green-600 font-poppins dark:text-neutral-200 text-sm">
              City: <span className="text-lg">{post.city || 'City'}</span>
            </p>
            <hr />
            <div className="pt-2 font-poppins bg-blue-300  w-[90%]">
              <p className="text-sm text-neutral-600 dark:text-neutral-200  bg-red-400">
                {showMore ? post.description : `${post.description.substring(0, 200)}...`}
              </p>
              <button onClick={() => setShowMore(!showMore)} className="text-blue-500 hover:underline">
                {showMore ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>

          <div className="flex justify-end p-2">
            <button
              // onClick={() => handleApprove(post.id)}
              className='text-sm m-2 shadow-lg hover:opacity-90 bg-green-700 px-5 rounded-full font-normal text-white p-2 ml-2 font-poppins'
            >
              Approve
            </button>
            <button
              // onClick={() => handleReject(post.id)}
              className='text-sm m-2 shadow-lg hover:opacity-90 bg-red-700 px-5 rounded-full font-normal text-white p-2 ml-2 font-poppins'
            >
              Reject
            </button>
          </div>
        </div>
    </div>
  )
}

export default MyUploadsCard
