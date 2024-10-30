import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddMember() {
  const { register, handleSubmit, reset } = useForm();
  const [completed, setCompleted] = useState(false);
  const [whatsappGroupLink, setWhatsappGroupLink] = useState('');

  const onSubmit = async (data) => {
    const { name, email, phone } = data; // Destructure the fields to send

    // Format the phone number for WhatsApp
    const formattedPhone = `92${phone.replace(/^0/, '')}`; // Remove leading zero and add country code

    try {
      const response = await axios.post('http://localhost:5000/api/v1/members/add-member', { name, email, phone });
      if (response.status === 200) {
        reset();
        setCompleted(true);
        
        // Set the WhatsApp group link
        const groupId = 'https://chat.whatsapp.com/FNE1kwVNEHKBcscnMUSn9I'; // Your actual group ID
        const inviteLink = `https://wa.me/${formattedPhone}?text=Join%20my%20WhatsApp%20group%3A%20${groupId}`;
        setWhatsappGroupLink(inviteLink);

      
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
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
            <label className='block mb-2 text-lg font-medium text-gray-700'>Email</label>
            <input
              type='email'
              {...register('email', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter Email'
            />
          </div>
          <div>
            <label className='block mb-2 text-lg font-medium text-gray-700'>Phone (without leading zero)</label>
            <input
              type='text'
              {...register('phone', { required: true })}
              className='w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter Phone'
            />
          </div>
          <button
            type='submit'
            className='w-full px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
          >
            Add User
          </button>
        </form>
        {completed && (
          <div className='text-center text-green-500 mt-4'>
            <p>User added successfully!</p>
            <p>Invite link: <a href={whatsappGroupLink} className='text-blue-500' target="_blank" rel="noopener noreferrer">Join WhatsApp Group</a></p>
          </div>
        )}
      </main>
    </section>
  );
}

export default AddMember;
