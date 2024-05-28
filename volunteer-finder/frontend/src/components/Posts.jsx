import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

function Posts() {
    
  const [posts,setPosts]=useState([])
const [loading,setLoading]=useState(true)
  useEffect(() => {
    const getData=async() => {
      
    let res =   await axios.get(`${import.meta.env.VITE_BACKEND}/events`)
    setLoading(false)
    setPosts(res.data)
  }
  getData()
  },[])

  return (
    <div className='mx-auto max-w-7xl  bg-red-400'>
        {loading && <p>Loading...</p>}
        <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>

      {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        </div>
    </div>
  )
}

export default Posts