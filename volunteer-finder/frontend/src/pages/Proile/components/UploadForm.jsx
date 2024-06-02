import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
const EventForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading,setisLoading]= useState(false)
const [thumbmail,setThumbnail] = useState(null)
const navigate = useNavigate()
  const onSubmit = async(data) => {
    // console.log(data);
    let obj = {...data,thumbnail:thumbmail[0]}
     let res =    await axios.post(`${import.meta.env.VITE_BACKEND}/events`,obj)
    //  toast.promise(res, {
    //   loading: 'Creating Event...',
    //   success: 'Event created successfully',
    //   error: 'Error creating event',
    //  })
    if(res.status==200){
      toast.success("Event created successfully, wait for admin approval")
      navigate('/')
    }
      };

async function uploadPhoto(e) {
    const file = e.target.files[0];
    if (file) {
      // const tempUrl = URL.createObjectURL(file);
      // setThumbnail(tempUrl);

      const data = new FormData();
      data.append('thumbnail', file);

      try {
        setisLoading(true)
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND}/events/upload`,
          data,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        setThumbnail(res.data)
        setisLoading(false)
      } catch (error) {
        setisLoading(false)
        console.error('Error uploading the file:', error);
      }
    }


    // for (let i = 0; i < files.length; i++) {
    //     data.append('photos', files[i]);
    // }

    // axios
    //     .post('/api/tour/upload', data, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     })
    //     .then((response) => {
    //         const filenames = response.data;

    //         console.log(response.data);
    //         onChange((prev) => [
    //             ...prev, ...filenames]);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
}

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && <p className="text-red-600">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            {...register('time', { required: 'Time is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.time && <p className="text-red-600">{errors.time.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
          placeholder='Enter map location'
            {...register('location', { required: 'Location is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.location && <p className="text-red-600">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register('address', { required: 'Address is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.address && <p className="text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.city && <p className="text-red-600">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('contact.phone')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('contact.email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Entered value does not match email format'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contact?.email && <p className="text-red-600">{errors.contact.email.message}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Volunteers</label>
          <input
            type="number"
            {...register('NumberOfVolunteer', { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
           onChange={uploadPhoto}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

            
            <div>
              {isLoading && <p>Loading...</p>}
                <img src={thumbmail} hidden={!thumbmail} alt="thumbnail" />
            </div>


        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
