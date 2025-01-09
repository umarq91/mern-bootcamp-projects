import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/reset-password/${token}`, { newPassword });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      toast.error(err.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
