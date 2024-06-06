import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PayFee() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/members');
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(user => String(user.rollNumber).includes(query));
    setFilteredUsers(filtered);
    setIsSearched(true);
  };

  const handleFeeUpdate = async(userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, feePaid: new Date().toISOString().split('T')[0] } : user
    );
   let data = await  axios.patch(`http://localhost:5000/api/v1/members/${userId}`);
  
     console.log(data);
    if(data.status==200){
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers.filter(user => String(user.rollNumber).includes(searchQuery)));
      setTimeout(() => {
        window.location.href="/admin/user-info";
      },500)
    }
     // setUsers(updatedUsers);
    // setFilteredUsers(updatedUsers.filter(user => user.rollNumber.includes(searchQuery)));
  };

  return (
    <section className='p-10 md:p-20 bg-gray-100 min-h-screen'>
      <main className='flex flex-col bg-white shadow-lg rounded-lg p-5 max-w-2xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center text-gray-700'>Pay Fee</h2>
        <div className='flex flex-col justify-center items-center mb-5'>
          <input
            className='block w-full p-2 border border-gray-300 rounded-md mb-4'
            type="text"
            placeholder='Search by Roll Number'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* User Info */}
        {isSearched && (
          filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className='flex flex-col md:flex-row bg-gray-50 shadow-md rounded-lg p-5 mb-5'>
                <div className='flex-2 p-5'>
                  <div className='space-y-2'>
                    <h3 className='text-lg'>Name: <span className='font-bold'>{user.name}</span></h3>
                    <h3 className='text-lg'>Roll Number: <span className='font-bold'>{user.rollNumber}</span></h3>
                    <h3 className='text-lg'>Email: {user.email}</h3>
                    <h3 className='text-lg'>Phone: {user.phone}</h3>
                    <h3 className='text-lg'>Fee Paid Date: {user.feePaid}</h3>
                    <button
                      className='mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'
                      onClick={() => handleFeeUpdate(user.id)}
                    >
                      Mark Fee as Paid
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center text-gray-500'>No users found</div>
          )
        )}
      </main>
    </section>
  );
}

export default PayFee;
