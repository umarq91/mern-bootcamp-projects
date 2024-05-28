import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../../context/authContext';

export const ProfileOption = () => {
  const { user } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      profile: user.profile || ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   useEffect(() => {
//     setValue('name', user.name);
//     setValue('email', user.email);
//     setValue('profile', user.profile);
//   }, [user, setValue]);

  const handleUpdate = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND}/user/`+user._id, formData);
      console.log(res);
      // Handle success, e.g., show a success message or update the user context
    } catch (err) {
      setError(err.response.data.message || 'Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <div className="picture"></div>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-4">
          <img
            className="h-24 w-24 self-center rounded-full"
            src={user.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s'}
            alt="Profile"
          />
          <input
            type="text"
            placeholder="Name"
            className="bg-slate-100 p-3 rounded-lg"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-red-600">Name is required</span>}

          <input
            type="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-lg"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="text-red-600">Email is required</span>}

          <input
            type="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-lg"
            {...register('password')}
          />

          <button
            type="submit"
            className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>

        {error && <p className="text-red-700 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default ProfileOption;
