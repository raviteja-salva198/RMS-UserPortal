import React, { useEffect, forwardRef } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = forwardRef(function ProfileSidebar(
  { setIsSidebarOpen, isSidebarOpen },
  ref
) {
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsSidebarOpen]);

  return (
    <div ref={ref} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <div className="user-info">
        <div className="profile-icon">
          <i className="fas fa-user"></i>
        </div>
        <h2>Akshaya Suresh</h2>
        <p>You are logged in as:</p>
      </div>
      <button className="sidebar-btn">Logout</button>
      <button
        className="sidebar-btn"
        onClick={() => {
          navigate("/edit-profile");
        }}
      >
        Edit Profile
      </button>
      <button className="sidebar-btn">Update Registration details</button>
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dx9i4cezk/image/upload/v1706765912/agh-logo1_cuz9ns.png"
          alt="Company Logo"
          className="company-logo"
        />
      </div>
      <footer className="sidebar-footer">
        <p>
          &copy; {new Date().getFullYear()} Aptitude Guru Hem. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
});

export default ProfileSidebar;
