import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import './ProfileButton.css'
import LoginFormModal from "../LoginFormModal";
import { NavLink } from "react-router-dom";
import { clearWishlists } from "../../store/wishlists";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (event) => {
      const profileDropdown = document.getElementsByClassName('profile-dropdown')[0];
      if (profileDropdown && !profileDropdown.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, user]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(clearWishlists());
  };

  // const handleLoginClick = () => {

  // }

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <GiHamburgerMenu id="hamburger-menu"/>
        <FaUserCircle id="profile-icon"/>
      </button>
      { user && showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li id="trips-link-li"><NavLink id="trips-link" to="/reservations" >Trips</NavLink></li>
          <li id="wishlist-link-li"><NavLink id="trips-link" to="/wishlists" >Wishlist</NavLink></li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      { !user && showMenu && (
        <ul className="profile-dropdown">
          <div className="login-link">
            <LoginFormModal />
          </div>
          <div className="signup-link">
            <NavLink to="/signup" >Sign Up</NavLink>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;