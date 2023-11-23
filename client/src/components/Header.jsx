import React from "react";
import logo from "../assets/Screenshot_2023-10-23_204227-removebg-preview1.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  // Define a container style for the header to use Flexbox
  const headerStyle = {
    display: "flex",
    alignItems: "center", // Vertically center items
    background: "#000659", 
  };

  // Define an inline style to control the image size
  const logoStyle = {
    width: "100px", // Adjust the width as needed
    height: "auto", // This maintains the aspect ratio
    marginRight: "10px", // Adjust spacing between the logo and text
  };

  // Define a custom style for the text color
  const customTextStyle = {
    color: "#7743DB",
    fontSize: "35px", // Change the text color to red (or use your preferred color)
  };

  const inputStyle = {
    background: "transparent",
    border: "1px solid #BEADFA",
    color: "#BEADFA",
    textAlign: "center",
    fontSize: "20px",
  };

  const customTextStyle2 = {
    color: "#BEADFA",
    fontSize: "35px", // Change the text color to red (or use your preferred color)
  };

  const headerItems = {
    color: "#BEADFA",
  };

  return (
    <header className="bg-black shadow-md" style={headerStyle}>
      <img src={logo} alt="Collabify Logo" style={logoStyle} />
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span style={customTextStyle2}>Collab</span>
          <span style={customTextStyle}>ify</span>
        </h1>
      </Link>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <form className="p-3 rounded-lg flex items-center">
          <div className="relative w-24 sm:w-64">
            <input
              type="text"
              placeholder="Search Influencer"
              style={inputStyle}
              className="rounded-lg w-full"
            />
            <FaSearch className="text-slate-600 absolute right-3 top-2" />
          </div>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li
              className="hidden sm:inline hover:underline"
              style={headerItems}
            >
              Home
            </li>
          </Link>
          <Link to="about">
            <li
              className="hidden sm:inline hover:underline"
              style={headerItems}
            >
              About
            </li>
          </Link>
          <Link to="/profile">
          {currentUser ? (
            <img className="rounded-full h-7 w-7 object-cover" src = {currentUser.avatar} alt="profile" />
          ): (
            <li className="sm:inline hover:underline" style={headerItems}>Sign In</li>   
        )}
        </Link>

        </ul>
      </div>
    </header>
  );
}
