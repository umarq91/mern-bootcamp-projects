import axios from 'axios'
import  { useEffect, useState } from 'react'
import Empty from "../../../components/Empty"
import MyUploadsCard from '../../../components/MyPostCard'

function ProfilePosts() {
const [posts,setPosts]=useState([])

    useEffect(()=>{
        const getData=async()=>{
          const res =  await axios.get(`${import.meta.env.VITE_BACKEND}/events/admin`)
              console.log(res);
          if(res.status==200){
            setPosts(res.data)
          }
        }
        getData()
    },[])

  return (
    <div>
      {posts.length==0 && <Empty/>}
      {/* <MyUploadsCard post={{title}}/> */}
      {posts.map((post) => (
        <MyUploadsCard post={post} key={post._id}/>
      ))}
    </div>
  )
}

export default ProfilePosts