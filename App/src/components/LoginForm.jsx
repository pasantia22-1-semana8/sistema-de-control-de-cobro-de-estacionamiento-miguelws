import React from 'react';
import { useNavigate } from "react-router-dom";

import './styles/LoginForm.css';

export default function LoginForm (props) {
  let navigate = useNavigate();
  
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await fetch('http://127.0.0.1:8000/auth/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(props.myCredentials)
      })
      .then(data => data.json())
      .then(data => {
        props.getToken(data.token);
        if (data.token) {
          navigate('/stay')
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='login' className="container">
      <h1 className="text-center pb-5">Sign in</h1>
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
              <input id='tamano' type="submit" name="submit" className="btn btn-dark" value="Iniciar Sesion"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}