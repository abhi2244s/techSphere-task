import React from 'react';
import '../Sidebar/Sidebar.scss';
import logo from '../../assets/Logo.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='container'>
      <div className='imageContainer'>
        <img src={logo} alt='logo' loading='lazy' />
      </div>
      <div className='link'>
        <NavLink exact to='/' className='active-link'>
          <h4 >For You</h4>
        </NavLink>
        <NavLink to='/favorite' className='active-link'>
          <h4 >Favorites</h4>
        </NavLink>
        <NavLink to='/recently' className='active-link'>
          <h4 >Recently Played</h4>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
