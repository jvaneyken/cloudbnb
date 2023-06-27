import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { FaAirbnb, FaLinkedin, FaGithub } from 'react-icons/fa';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navigation-ul' >
      <li>
          <NavLink exact to="/">
            <div className='logo-div'>
              <FaAirbnb className='logo'/>
              <p>cloudbnb</p>
            </div>
          </NavLink>
      </li>
      <li>
        <div id='professional-links'>
          <a href='https://www.linkedin.com/in/joshvaneyken/' target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href='https://github.com/jvaneyken' target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        </div>
        <ProfileButton user={sessionUser} />
      </li>
    </ul>
  );
}

export default Navigation;

