import React from 'react';
import {Link} from 'react-router-dom';

function PostCard({ post }) {
  const isUpcoming = new Date(post.date) > new Date();
  const maxLength = 100;
  const truncatedDescription = post.description.length > maxLength 
    ? `${post.description.substring(0, maxLength)}...` 
    : post.description;

  return (
    <Link to={`/event/${post.id}`} className='relative cursor-pointer  hover:scale-105 transition-all duration-200 flex flex-col justify-between  h-[350px] md:h-[400px] w-[80%] lg:w-full p-4 border border-gray-300 rounded-lg shadow-md m-2'>
        <div className='relative'>
        {isUpcoming && (
          <span className='absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded'>
            Upcoming
          </span>
        )}
        <img 
          className='h-48 w-full object-cover rounded-t-lg'
          src={ post.thumbnail || 'https://t4.ftcdn.net/jpg/02/36/07/25/360_F_236072530_kcUaIg8NInOhhln3qxjyAwPXhGflP6W0.jpg'} 
          alt={post.title} 
        />
        </div>
        <div className='p-4 flex flex-col justify-between flex-grow'>
        <h2 className='text-lg font-bold'>{post.title}</h2>
        <p className='text-gray-600 text-sm'>{truncatedDescription}</p>
        <p className='text-gray-800 mt-3'> Volunteers Required: {post.NumberOfVolunteer}</p>
      
      </div> 
      <div className='p-4 flex justify-between '>
        <p className='text-gray-600 mb-2'><strong>City:</strong> {post.city}</p>
        <p className='text-gray-600 mb-2'><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
        </div>
    

    </Link>
  );
}

export default PostCard;
