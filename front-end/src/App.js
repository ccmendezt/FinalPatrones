import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Conocenos from './views/Conocenos';
import { ProtectedRoute } from "./components/ProtectedRoute";
import PerfilAdmin from './views/PerfilAdmin';
import Administracion from './views/Administracion';
import Reportes from './views/Reportes';
import Estadisticas from './views/Estadisticas';
import Operatividad from './views/Operatividad';
import Create from './views/Create';
import Edit from './views/Edit';

function App() {
  return (
    <div className="App">
      <Routes>
          {/* Rutas para el cliente */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/conocenos" element={<Conocenos />} />
        </Route>

          {/* rutas para la Administracion */}
          <Route path="/admin" element={<Administracion/>}/>
          <Route path="/reportes" element={<Reportes/>}/>
          <Route path="/estadisticas" element={<Estadisticas/>}/>
          <Route path="/operatividad" element={<Operatividad/>}/>
          <Route path="/perfilAdmin" element={<PerfilAdmin/>}/>

          {/* Rutas para los formularios */}
          <Route path="/sucursal/new" element={<Create/>}/>
          <Route path="/sucursal/edit" element={<Edit/>}/>

          {/* Rutas para el empleado */}
      </Routes>
    </div>
  );
}

export default App;
