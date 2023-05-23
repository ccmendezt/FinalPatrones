import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Conocenos from './views/Conocenos';
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/conocenos" element={<Conocenos />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
