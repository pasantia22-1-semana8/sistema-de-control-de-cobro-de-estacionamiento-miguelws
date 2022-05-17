import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import './styles/Navbar.css';

export default function NavigationBar (props) {
  let navigate = useNavigate();
  
  const logout = e => {
    localStorage.removeItem('token-info');
    navigate('/');
  }

  return (
    <div>
    </div>
  );
}