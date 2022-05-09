import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Stay from '../pages/Stay';
import NotFound from '../pages/NotFound';

export default function App() {

  const [token, setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login userLogin={userLogin}/>}/>
          <Route path="/stay" element={<Stay token={token} userData={userLogin}/>}/>
          <Route path="" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}