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

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <Login />
    //   </header>
    // </div>
  );
}

export default App;
