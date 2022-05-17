import React from 'react';
import { useNavigate } from "react-router-dom";

import './styles/LoginForm.css';
import api from '../service/Api';

export default function LoginForm (props) {
  let navigate = useNavigate();
  
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await api.auth.get(props.myCredentials).then(data => data.json()).then(data => {
        if (data.token) {
          localStorage.setItem('token-info', JSON.stringify(data.token));
          props.getToken(JSON.parse(localStorage.getItem('token-info')));
          navigate('/stay')
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='login' className="container">
      <h1 className="text-center pb-5">Inicio de sesión</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                onChange={props.onChange}
                value={props.myCredentials.username}
                type="text"
                name="username"
                placeholder="Username"
                required={true}
              />
            </div>
            <div className="form-group pt-3">
              <input
                className="form-control"
                onChange={props.onChange}
                value={props.myCredentials.password}
                type="password"
                name="password"
                placeholder="Password"
                required={true}
              />
            </div>
            <div className="text-center pt-4">
              <input id='tamano' type="submit" name="submit" className="btn btn-dark" value="Entrar"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}