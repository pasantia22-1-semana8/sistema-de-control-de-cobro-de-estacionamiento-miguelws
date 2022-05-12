import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Navbar.css';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse">
          <Link className="navbar-brand" to="">Administrador</Link>
          <div className="container-fluid">
            <img className="Navbar__brand-logo" src="https://www.crearlogogratisonline.com/images/crearlogogratis_1024x1024_01.png" alt="logo"/>
            <div className="navbar-header">
              <Link id='estilos' className="navbar-brand" to="/stay">ESTANCIAS</Link>
              <Link id='estilos' className="navbar-brand" to="/payment">PAGOS</Link>
              <Link id='estilos' className="navbar-brand" to="/ticket">TICKETS</Link>
              <Link id='estilos' className="navbar-brand" to="/vehicle">VEHICULOS</Link>
            </div>
            <div className="navbar-header navbar-right">
              <Link id='color' className="navbar-brand" to="/">Cerrar Sesion</Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}