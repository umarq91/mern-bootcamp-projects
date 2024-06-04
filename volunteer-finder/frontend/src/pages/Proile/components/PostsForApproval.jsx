import axios from 'axios'
import  { useEffect, useState } from 'react'
import Empty from "../../../components/Empty"
import MyUploadsCard from '../../../components/MyPostCard'

function ProfilePosts() {
const [posts,setPosts]=useState([])

    useEffect(()=>{
        const getData=async()=>{
          console.log("yes");
          const res =  await axios.get(`${import.meta.env.VITE_BACKEND}/events/admin`)
              console.log(res);
          if(res.status==200){
            setPosts(res.data)
          }
        }
        getData()
    },[])
    const handleRemove = async(id) => {
    const data = posts.filter((post) => post.id !== id)
  setPosts(data)  
  }

  return (
    <div>
      {posts.length==0 && <Empty/>}
      {/* <MyUploadsCard post={{title}}/> */}
      {posts.map((post) => (
        <MyUploadsCard post={post} key={post._id} onRemove={handleRemove}/>
      ))}
    </div>
  )
}

export default ProfilePosts