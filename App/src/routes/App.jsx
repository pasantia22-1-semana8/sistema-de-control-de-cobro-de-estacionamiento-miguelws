import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Stay from '../pages/Stay';
import Payment from '../pages/Payment';
import Ticket from '../pages/Ticket';
import Vehicle from '../pages/Vehicle';
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';

import Private from './Private';

export default function App() {

  const [token, setToken] = useState('');
  const userToken = (tok) => {
    if (tok) {
      setToken(tok);
    } else {
      console.log('Error: No hay autorizacion');
    }
  }

  /*
  console.log('token-routes: ' + JSON.parse(localStorage.getItem('token-info')));
  const [token, setToken] = useState('');

  if (localStorage.getItem('token-info')) {
    useEffect(() => {
      setToken(JSON.parse(localStorage.getItem('token-info')));
    });
  } else {
    console.log('Error: No hay autorizacion');
  }
  */
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login getToken={userToken} />} />
          <Route path="" element={<NotFound/>}/>
        </Routes>
        <Layout>
          <Routes>
            <Route path="/stay" element={<Stay myToken={token} />} />
            <Route path="/payment" element={<Payment myToken={token} />} />
            <Route path="/ticket" element={<Ticket myToken={token} />} />
            <Route path="/vehicle" element={<Vehicle myToken={token} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

//<Route path="/" element={<Login getToken={userToken} />} />

/*
<Route path="/stay" element={<Private component={Stay} role={'admin'} myToken={token} />} />
<Route path="/payment" element={<Private component={Payment} role={'admin'} myToken={token} />} />
<Route path="/ticket" element={<Private component={Ticket} role={'admin'} myToken={token} />} />
<Route path="/vehicle" element={<Private component={Vehicle} role={'admin'} myToken={token} />} />
*/