import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import axios from 'axios'

function Administracion() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sucursales, setSucursales] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/parking`);
        console.log(response.data);
        setSucursales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminNav></AdminNav>
      <div className='container'>
        <div className='d-flex' style={{ justifyContent: "end" }}>
          <a href='/sucursal/new'><button className='btn btn-success mx-2'>Nuevo parqueadero</button></a>
        </div>
        {/* Componente de sucursal admin */}
        <div className='card my-3'>
          <div className='card-body d-flex' >
            <div className='col-8 text-left'>
              <h3>Sucursal: Teusaquillo </h3>
              <div>Dirección: Calle 34 # 8 - 42 </div>
              <div>id: 1 </div>
              <div>Cupos: 30 </div>
            </div>
            <div className='d-flex set-middle'>
              <a href='/sucursal/edit'><button className='btn btn-success mx-2'>Editar</button></a>
              <a><button className='btn btn-danger mx-2 '>Eliminar</button></a>
            </div>
          </div>
        </div>

        <div className='card my-3'>
          <div className='card-body d-flex' >
            <div className='col-8 text-left'>
              <h3>Sucursal: Chapinero </h3>
              <div>Dirección: Calle 40 # 8 - 42 </div>
              <div>id: 1 </div>
              <div>Cupos: 30 </div>
            </div>
            <div className='d-flex set-middle'>
              <a href='/sucursal/edit'><button className='btn btn-success mx-2'>Editar</button></a>
              <a><button className='btn btn-danger mx-2 '>Eliminar</button></a>
            </div>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Administracion