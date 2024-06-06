import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

function Trainer() {
  const [activeTab, setActiveTab] = useState('add');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    about: '',
    monthlyFee: ''
  });
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    if (activeTab === 'find') {
      fetchTrainers();
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/trainer', form);
      console.log(response.data);
      setForm({
        name: '',
        email: '',
        phone: '',
        about: '',
        monthlyFee: ''
      });
      fetchTrainers();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/trainer');
      console.log(response.data);
      setTrainers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex justify-between">
            <button
              className={`w-full py-4 px-6 text-center ${activeTab === 'add' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('add')}
            >
              Add a Trainer
            </button>
            <button
              className={`w-full py-4 px-6 text-center ${activeTab === 'find' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              on              onClick={() => setActiveTab('find')}
              >
                Find a Trainer
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'add' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Add a Trainer</h2>
                <form onSubmit={handleAddTrainer}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">About</label>
                    <textarea
                      name="about"
                      value={form.about}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Monthly Fee</label>
                    <input
                      type="number"
                      name="monthlyFee"
                      value={form.monthlyFee}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                </form>
              </div>
            )}
            {activeTab === 'find' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Find a Trainer</h2>
                <div className="mt-6 grid grid-cols-1  gap-4">
                  {trainers.length > 0 ? (
                    trainers.map((trainer, index) => (
                      <div key={index} className="p-6 border rounded-lg shadow-lg bg-white">
                        <h3 className="text-xl font-bold mb-2">{trainer.name}</h3>
                        <p className="flex items-center mb-1"><FaEnvelope className="mr-2 text-blue-500" /> {trainer.email}</p>
                        <p className="flex items-center mb-1"><FaPhone className="mr-2 text-blue-500" /> {trainer.phone}</p>
                        <p className="flex items-center mb-1"><FaInfoCircle className="mr-2 text-blue-500" /> {trainer.about}</p>
                        <p className="flex items-center mb-1"><FaDollarSign className="mr-2 text-blue-500" /> Rs. {trainer.monthlyFee}</p>
                      </div>
                    ))
                  ) : (
                    <p>No trainers found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Trainer;
  
