import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { FaAirbnb } from 'react-icons/fa';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul >
      <li>
          <NavLink exact to="/">
            <div className='logo-div'>
              <FaAirbnb className='logo'/>
              <p>cloudbnb</p>
            </div>
          </NavLink>
      </li>
      <li>
      <ProfileButton user={sessionUser} />
      </li>
    </ul>
  );
}

export default Navigation;

