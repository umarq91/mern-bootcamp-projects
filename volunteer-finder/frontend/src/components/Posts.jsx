import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cityFilter, setCityFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [cities, setCities] = useState([])

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND}/events`)
      setLoading(false)
      const postsData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(postsData)
      const uniqueCities = [...new Set(postsData.map(post => post.city))].sort()
      setCities(uniqueCities)
    }
    getData()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesCity = cityFilter ? post.city.toLowerCase() === cityFilter.toLowerCase() : true
    const matchesSearch = searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.city.toLowerCase().includes(searchQuery.toLowerCase()) : true
    return matchesCity && matchesSearch
  })

  return (
    <div className='mx-auto max-w-7xl my-20'>
      <h1 className='text-3xl md:text-6xl mb-10 text-center font-bold font-poppins'>Find Events to Volunteer</h1>
      {loading && <p>Loading...</p>}
      
      <div className='flex justify-center mb-6 space-x-4'>
        <select
          className='p-2 border border-gray-300 rounded'
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value=''>All Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='Search by title or city'
          className='p-2 border border-gray-300 rounded'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4'>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Posts
