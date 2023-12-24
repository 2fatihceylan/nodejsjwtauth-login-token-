import { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import HomePage from './components/screens/HomePage';
import LoginPage from './components/screens/LoginPage';

function App() {





  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/userlogin" element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
 
      
    </div>
  );
}

export default App;
