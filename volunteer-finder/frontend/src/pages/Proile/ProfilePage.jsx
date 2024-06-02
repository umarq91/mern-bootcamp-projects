import { useEffect, useRef, useState } from 'react';
import PostForApproval from './components/PostsForApproval';
import { ProfileOption } from './components/ProfilOptions';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const options = ['My Profile', 'My Posts', 'Create a post'];
  const {user,getting} = useAuth()
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate()
  let selectedOption = query.get('option') || 'My Profile';


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [sidebarOpen]);

     
        useEffect(() => {
          if (!getting && user.isAdmin) {
            navigate('/profile'); // Redirect to login if user is not authenticated
          }
        }, [getting, user, navigate]);
    

  const toggleSidebar = () => {
    
    setSidebarOpen(!sidebarOpen);
  };

  const handleOptionClick = (option) => {
    navigate(`?option=${option}`);
    setSidebarOpen(false); // Close the sidebar on mobile after selecting an option
  };
  
  const handleLogout =async () => {
   const res = await  axios.get(`${import.meta.env.VITE_BACKEND}/auth/logout`);
    if(res.status==200){
      window.location.reload();
    }
  }
  const renderContent = () => {
    switch (selectedOption) {
      case 'My Profile':
        return <ProfileOption/>;
      case 'My Posts':
        return <PostForApproval/>;
        case 'Create a post':
          return <UploadForm/>;
          case 'Pending Posts':
          return <PostForApproval/>;
      default:
        return <p>Main content goes here...</p>;
    }
  };
  return (
    <>
      {/* Sidebar button */}
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
      ref={sidebarRef}
        id="default-sidebar"
        className={`fixed  top-16 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* Sidebar links */}
          <ul className="space-y-2 font-medium">
            {/* Replace with your actual sidebar links */}
         {options.map((option) => (
          <>

                <li key={option}>
                <a
                href="#"
                onClick={() => handleOptionClick(option)}
                className={`flex items-center p-2 rounded-lg group ${
                  selectedOption === option
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                >
                <span className="ms-3">{option}</span>
              </a>
              </li>
           </>
         ))}

          {user?.isAdmin && (
             <li className=' relative'>
             <a
             href="#"
             onClick={() => handleOptionClick("Pending Posts")}
             className={`flex items-center p-2 rounded-lg group ${
               selectedOption === "Pending Posts"
               ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
               : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
             }`}
             >
             <span className="ms-3">{"Pending Posts"}</span>
            <span className='text-xs absolute  right-3 font-light text-green-600'>admin</span>
           </a>
           </li>
          )}

         <li>
                <a
                href="#"
                className={`flex items-center p-2 rounded-lg group text-center bg-red-700 text-white`}
              >
             
                <span onClick={handleLogout} className="ms-3 text-center"> Sign Out </span>
              </a>
              </li>
           
            {/* Add more sidebar links as needed */}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64 min-h-screen">
        {/* Replace with your main content */}
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* Replace with your actual content */}
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
