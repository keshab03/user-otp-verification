import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import icon from './profile-icon.png';
import userservice from '../services/Userservice';
import logo from './kmLogo.jpg'

const Nav = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await userservice.getallemployee();
        if (response && response.length > 0) {
          // console.log("Getting for Nav", response);
          setData(response);
        } else {
          console.log('No User Details Found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);

  return (
    <div id='nav'>
      <Link to='/'>
        <img src={logo} alt="" />
      </Link>
      <h1>User Management</h1>
      <div style={{ display: 'flex' }}>
      <Link to='/seealldetails'> 
      <img src={icon} alt="" />
      </Link>  
        <p style={{ fontWeight: 'bolder' }}>E:- {data.length}</p>
      </div>
    </div>
  );
};

export default Nav;
