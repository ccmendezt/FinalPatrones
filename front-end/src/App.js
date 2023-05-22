import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import Login from './views/Login';
import Register from './views/Register';
import React from 'react';
import Home from './views/Home';
import Conocenos from './views/Conocenos';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/conocenos" element={<Conocenos/>}/>
        </Routes>
    </div>
  );
}

export default App;
