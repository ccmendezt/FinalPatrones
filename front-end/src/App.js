import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Cookies from 'js-cookie';

//No protected
import Login from './views/NoProtected/Login';
import Register from './views/NoProtected/Register';

//Protected Client
import Home from './views/Protected/Client/Home';
import Conocenos from './views/Protected/Client/Conocenos';
import Reservas from './views/Protected/Client/Reservas';
import Sucursales from './views/Protected/Client/Sucursales';
import Perfil from './views/Protected/Client/Perfil';
import EditProfileClient from './views/Protected/Client/EditProfileClient.jsx';

//Protected Admin
import PerfilAdmin from './views/Protected/Admin/PerfilAdmin';
import Administracion from './views/Protected/Admin/Administracion.jsx';
import Reportes from './views/Protected/Admin/Reportes';
import Estadisticas from './views/Protected/Admin/Estadisticas';
import Operatividad from './views/Protected/Admin/Operatividad.jsx';
import RegistrarAdmin from './views/Protected/Admin/RegisterAdmin.jsx';
import Create from './views/Protected/Admin/Create';
import Edit from './views/Protected/Admin/Edit';
import EditProfile from './views/Protected/Admin/EditProfile.jsx';
import NewReserva from './views/Protected/Client/NewReserva.jsx';
import Ciudades from './views/Protected/Client/Ciudades.jsx';
import CiudadesId from './views/Protected/Client/CiudadesId.jsx';



function App() {
  const idRole = parseInt(Cookies.get('idRole'));
  return (
    <div className="App">
      <Routes>
        {/* Rutas sin proteccion */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Rutas para el cliente */}
        <Route element={<ProtectedRoute isAllowed={!!idRole && idRole === 3} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/sucursales/:id" element={<NewReserva/>} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/editclient" element={<EditProfileClient />} />
          <Route path="/ciudades" element={<Ciudades />} />
          <Route path="/ciudades/:id" element={<CiudadesId />} />
        </Route>


        {/* rutas para la Administracion */}
        <Route element={<ProtectedRoute isAllowed={!!idRole && idRole === 1} />}>
          <Route path="/admin" element={<Administracion />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/operatividad" element={<Operatividad />} />
          <Route path="/PerfilAdmin" element={<PerfilAdmin />} />
          <Route path="/registrarAdmin" element={<RegistrarAdmin />} />
          <Route path="/sucursal/new" element={<Create />} />
          <Route path="/sucursal/edit/:id" element={<Edit />} />
          <Route path="/perfil/edit" element={<EditProfile />} />
        </Route>


        {/* Rutas para los formularios */}

        {/* Rutas para el empleado */}
      </Routes>
    </div>
  );
}

export default App;
