import React from 'react';
import { useUser } from '../user-context/User-context';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const style = {
  navbar: `flex justify-between items-center h-16 bg-gray-800 text-white px-4 shadow-md`,
  logo: `text-xl font-bold`,
  userSection: `flex items-center`,
  button: `ml-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-200`,
  userName: `ml-2 text-lg`,
  profilePic: `w-10 h-10 rounded-full border-2 border-gray-300`, // Profile picture style
};

const Navbar = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={style.navbar}>
      <div className={style.logo}>Todo App</div>
      <div className={style.userSection}>
        {isAuthenticated ? (
          <>
            {user.photoURL && (
              <img src={user.photoURL} alt="Profile" className={style.profilePic} />
            )}
            <span className={style.userName}>{user.displayName}</span> 
            <button className={style.button} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className={style.button} onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
