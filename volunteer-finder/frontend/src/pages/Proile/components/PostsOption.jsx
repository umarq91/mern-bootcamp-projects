import axios from 'axios'
import  { useEffect, useState } from 'react'

function ProfilePosts() {
const [posts,setPosts]=useState([])

    useEffect(()=>{
        const getData=async()=>{
          const res =  await axios.get(`${import.meta.env.VITE_BACKEND}/events/posts`, { withCredentials: true })
          console.log(res);    
          if(res.status==200){
            setPosts(res.data)
          }
        }
        getData()
    },[])

  return (
    <div>
      {posts.length==0 && <p>No posts yet</p>}
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfilePosts