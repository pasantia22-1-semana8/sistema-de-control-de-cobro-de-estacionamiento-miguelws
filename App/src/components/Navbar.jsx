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
    <div className="Navbar">
      <nav className="navbar navbar-inverse">
        <Link className="navbar-brand" to=""></Link>
        <Link className="navbar-brand" to="">miguelv</Link>
        <div className="container-fluid">
          <img className="Navbar__brand-logo" src="https://www.crearlogogratisonline.com/images/crearlogogratis_1024x1024_01.png" alt="logo"/>
          <div className="navbar-header">
            <Link id='estilos' className="navbar-brand" to="/stay">ESTANCIAS</Link>
            <Link id='estilos' className="navbar-brand" to="/ticket">TICKETS</Link>
            <Link id='estilos' className="navbar-brand" to="/payment">PAGOS</Link>
            <Link id='estilos' className="navbar-brand" to="/vehicle">VEHICULOS</Link>
          </div>
          <div className="navbar-header navbar-right">
            <button className="btn btn-secondary" onClick={logout}>Salir</button>
          </div>
        </div>
      </nav>
    </div>
  );
}