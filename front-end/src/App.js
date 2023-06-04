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
import Ciudades from './views/Protected/Client/Ciudades.jsx';
import CiudadesId from './views/Protected/Client/CiudadesId.jsx';
import NewReserva from './views/Protected/Client/NewReserva.jsx';
import PrimerIngreso from './views/Protected/Client/PrimerIngreso.jsx';

//Protected Admin
import PerfilAdmin from './views/Protected/Admin/PerfilAdmin';
import Administracion from './views/Protected/Admin/Administracion.jsx';
import Reportes from './views/Protected/Admin/Reportes';
import Estadisticas from './views/Protected/Admin/Estadisticas';
import Operatividad from './views/Protected/Admin/Operatividad.jsx';
import RegistrarAdmin from './views/Protected/Admin/RegisterAdmin.jsx';
import CreateParqueadero from './views/Protected/Admin/CreateParqueadero.jsx';
import EditParqueadero from './views/Protected/Admin/EditParqueadero.jsx';
import EditProfile from './views/Protected/Admin/EditProfile.jsx';
import EditCiudad from './views/Protected/Admin/EditCiudad.jsx';
import CreateCiudad from './views/Protected/Admin/CreateCiudad.jsx';
import EstadisticasParqueadero from './views/Protected/Admin/EstadisticasParqueadero.jsx';

function App() {
  const idRole = parseInt(Cookies.get('idRole'));
  const primerIngreso = parseInt(Cookies.get('primerIngreso'));
  return (
    <div className="App">
      <Routes>
        {/* Rutas sin proteccion */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />

        {/* Rutas para el cliente */}

        {primerIngreso === 0 ?
          (
            <Route element={<ProtectedRoute isAllowed={!!idRole && idRole === 3 && primerIngreso === 0} />}>
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
          )
        :
          (
            <Route element={<ProtectedRoute isAllowed={!!idRole && idRole === 3 && primerIngreso === 1} />}>
              <Route path="/primerIngreso" element={<PrimerIngreso />} />
            </Route>
          )
        }
        


        {/* rutas para la Administracion */}
        <Route element={<ProtectedRoute isAllowed={!!idRole && idRole === 1} />}>
          <Route path="/admin" element={<Administracion />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/estadisticas/parqueadero" element={<EstadisticasParqueadero />} />
          <Route path="/operatividad" element={<Operatividad />} />
          <Route path="/operatividad/new" element={<CreateCiudad />} />
          <Route path="/operatividad/edit/:id" element={<EditCiudad />} />
          <Route path="/PerfilAdmin" element={<PerfilAdmin />} />
          <Route path="/registrarAdmin" element={<RegistrarAdmin />} />
          <Route path="/sucursal/new" element={<CreateParqueadero />} />
          <Route path="/sucursal/edit/:id" element={<EditParqueadero />} />
          <Route path="/perfil/edit" element={<EditProfile />} />
        </Route>


      </Routes>
    </div>
  );
}

export default App;
