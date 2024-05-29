import React from 'react';

function PostCard({ post }) {
  const isUpcoming = new Date(post.date) > new Date();

  return (
    <div className='relative cursor-pointer hover:scale-105 transition-all duration-200 flex flex-col h-[300px] w-[300px] p-4 border border-gray-300 rounded-lg shadow-md m-2'>
      <div className='relative'>
        {isUpcoming && (
          <span className='absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded'>
            Upcoming
          </span>
        )}
        <img 
          className='h-40 w-full object-cover rounded-t-lg'
          src={ post.thumbnail || 'https://t4.ftcdn.net/jpg/02/36/07/25/360_F_236072530_kcUaIg8NInOhhln3qxjyAwPXhGflP6W0.jpg'} 
          alt={post.title} 
        />
      </div>
      <div className='p-4 flex flex-col justify-between flex-grow'>
        <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
        <p className='text-gray-600 mb-2'><strong>City:</strong> {post.city}</p>
        <p className='text-gray-600 mb-2'><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default PostCard;
