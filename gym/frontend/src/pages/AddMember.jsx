import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function AddMember() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);

  const onSubmit = (data) => {
    setUsers([...users, data]);
    reset();
  };

  return (
    <section className='p-10 md:p-20 bg-gray-100 min-h-screen'>
      <main className='flex flex-col bg-white shadow-lg rounded-lg p-5 max-w-2xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center text-gray-700'>Add New User</h2>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='block mb-2 text-lg font-medium text-gray-700'>Name</label>
            <input
              type='text'
              {...register('name', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter Name'
            />
          </div>
          <div>
            <label className='block mb-2 text-lg font-medium text-gray-700'>Roll Number</label>
            <input
              type='text'
              {...register('rollNumber', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter Roll Number'
            />
          </div>
          <div>
            <label className='block mb-2 text-lg font-medium text-gray-700'>Email</label>
            <input
              type='email'
              {...register('email', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter Email'
            />
          </div>
          <div>
            <label className='block mb-2 text-lg font-medium text-gray-700'>Phone</label>
            <input
              type='text'
              {...register('phone', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter Phone'
            />
          </div>
          <div>
            <label className='block mb-2 text-lg font-medium text-gray-700'>Fee Paid Date</label>
            <input
              type='date'
              {...register('feePaid', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
            />
          </div>
          <button
            type='submit'
            className='w-full px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
          >
            Add User
          </button>
        </form>
        {users.length > 0 && (
          <div className='mt-10'>
            <h3 className='text-2xl font-bold mb-6 text-gray-700'>User List</h3>
            <ul className='space-y-6'>
              {users.map((user, index) => (
                <li key={index} className='bg-gray-50 shadow-md rounded-lg p-6'>
                  <h4 className='text-xl font-bold text-gray-700'>{user.name}</h4>
                  <p className='text-gray-600'>Roll Number: {user.rollNumber}</p>
                  <p className='text-gray-600'>Email: {user.email}</p>
                  <p className='text-gray-600'>Phone: {user.phone}</p>
                  <p className='text-gray-600'>Fee Paid Date: {user.feePaid}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </section>
  );
}

export default AddMember;
