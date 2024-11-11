import React from 'react';
import { useNavigate } from 'react-router-dom';
import todologo from '../assets/to-do-list.png';

const Navbar = ({isAuthenticated,  setIsAuthenticated}) => {
  const navigate = useNavigate();


  const handleSignOut = () => {
    console.log("clicks");
    localStorage.removeItem('token')
    setIsAuthenticated(false);
    navigate("/signin");
  };


  return (
    <nav className="bg-[#81007696] p-3 sm:p-4 flex justify-between sm:justify-around">
      <div className="logo flex gap-2 sm:gap-4 items-center">
        <img className="w-10 h-10" src={todologo} alt="Logo" />
        <span className="font-bold text-xl sm:text-2xl text-[#33032fe0]">W3Villa-ToDoList</span>
      </div>
      {!isAuthenticated ?<ul className="flex gap-3 sm:gap-8 items-center font-semibold sm:text-lg text-md">
        <li
          onClick={() => navigate('/signin')}
          className="cursor-pointer hover:text-[#ffff] transition-all ease duration-300 hover:underline decoration-black"
        >
          Sign In
        </li>
        <li
          onClick={() => navigate('/signup')}
          className="cursor-pointer hover:text-[#ffff] transition-all ease duration-300 hover:underline decoration-black"
        >
          Sign Up
        </li>
      </ul>:
      <button
      onClick={()=>handleSignOut()}
      className="navbtn bg-red-500 text-white text-xs md:text-base px-4 py-2 rounded-lg"
    >
      Sign Out
    </button>}
    </nav>
  );
};

export default Navbar;
