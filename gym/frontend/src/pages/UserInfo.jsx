import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function UserInfo() {
  const [users, setUsers] = useState([
    {
      id: 1,
      rollNumber: '101',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      feePaid: '2024-04-10',
    },
    {
      id: 2,
      rollNumber: '102',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      feePaid: '2024-06-01',
    },
    {
      id: 3,
      rollNumber: '103',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '555-123-4567',
      feePaid: '2024-05-30',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showPaid, setShowPaid] = useState(true);
  const [showUnpaid, setShowUnpaid] = useState(true);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, showPaid, showUnpaid]);

  function checkFee(lastDate) {
    const currentDate = new Date();
    const feeDate = new Date(lastDate);
    const diffTime = Math.abs(currentDate - feeDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 28;
  }

  function handleSearch() {
    const query = searchQuery.toLowerCase();
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.rollNumber.includes(query) ||
      user.phone.includes(query) ||
      user.email.toLowerCase().includes(query)
    );

    if (!showPaid && showUnpaid) {
      filtered = filtered.filter(user => !checkFee(user.feePaid));
    } else if (showPaid && !showUnpaid) {
      filtered = filtered.filter(user => checkFee(user.feePaid));
    }

    setFilteredUsers(filtered);
  }

  function togglePaid() {
    setShowPaid(prev => !prev);
    setShowUnpaid(true);
  }

  function toggleUnpaid() {
    setShowUnpaid(prev => !prev);
    setShowPaid(true);
  }

  return (
    <section className='p-10 md:p-20 bg-gray-100 min-h-screen'>
      <main className='flex flex-col bg-white shadow-lg rounded-lg p-5'>
        {/* Search Bar */}
        <div className='flex flex-col justify-center items-center mb-5'>
          <input
            className='block w-full p-2 border border-gray-300 rounded-md mb-4'
            type="text"
            placeholder='Search by Name, Roll Number, Phone, or Email'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='flex space-x-4'>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${showPaid ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={togglePaid}
            >
              Show Paid
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${showUnpaid ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={toggleUnpaid}
            >
              Show Unpaid
            </button>
          </div>
        </div>

        {/* User Info */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.id} className='flex flex-col md:flex-row bg-gray-50 shadow-md rounded-lg p-5 mb-5'>
              <div className='flex-2 p-5'>
                <div className='space-y-2'>
                  <h3 className='text-lg'>Name: <span className='font-bold'>{user.name}</span></h3>
                  <h3 className='text-lg'>Roll Number: <span className='font-bold'>{user.rollNumber}</span></h3>
                  <h3 className='text-lg'>Email: {user.email}</h3>
                  <h3 className='text-lg'>Phone: {user.phone}</h3>
                  <h3 className='text-lg'>
                    Fee Status: {checkFee(user.feePaid) ? (
                      <span className='flex items-center text-green-500'>
                        <FaCheckCircle className='mr-2' /> Fee Paid
                      </span>
                    ) : (
                      <span className='flex items-center text-red-500'>
                        <FaTimesCircle className='mr-2' /> Please Pay Fee
                      </span>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>No users found</div>
        )}
      </main>
    </section>
  );
}

export default UserInfo;
