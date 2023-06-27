import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import './ProfileButton.css'
import { NavLink, useLocation } from "react-router-dom";
import { clearWishlists } from "../../store/wishlists";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (event) => {
      const profileDropdown = document.querySelector('.profile-dropdown');
      if (profileDropdown && !profileDropdown.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, user]);

  const handleNavLinkClick = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(clearWishlists());
    setShowMenu(false);
  };

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
          <li id="trips-link-li"><NavLink className="trips-link" to="/reservations" onClick={handleNavLinkClick} >Trips</NavLink ></li>
          <li id="wishlist-link-li"><NavLink className="trips-link" to="/wishlists" onClick={handleNavLinkClick} >Wishlist</NavLink></li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      { !user && showMenu && (
        <ul className="profile-dropdown">
          <div className="login-link">
          <NavLink to={{ pathname: "/login", state: { from: location.pathname } }} onClick={handleNavLinkClick} >Log In</NavLink>
          </div>
          <div className="signup-link">
            <NavLink to={{ pathname: "/signup", state: { from: location.pathname } }}  onClick={handleNavLinkClick} >Sign Up</NavLink>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;