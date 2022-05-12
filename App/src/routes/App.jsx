import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Stay from '../pages/Stay';
import Payment from '../pages/Payment';
import Ticket from '../pages/Ticket';
import Vehicle from '../pages/Vehicle';
import NotFound from '../pages/NotFound';

export default function App() {

  const [token, setToken] = useState('');

  const userToken = (tok) => {
    setToken(tok);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login getToken={userToken} />} />
          <Route path="/stay" element={<Stay myToken={token} />} />
          <Route path="/payment" element={<Payment myToken={token} />} />
          <Route path="/ticket" element={<Ticket myToken={token} />} />
          <Route path="/vehicle" element={<Vehicle myToken={token} />} />
          <Route path="" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}