import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import Mapa from '../../../components/Maps/Mapa'
import axios from 'axios'
import imagen from '../../../images/CAR.jpg';
import Ciudad from '../../../components/CiudadAdmin';

function Operatividad() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sucursales, setCiudades] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/city`);
        setCiudades(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <AdminNav></AdminNav>
      {/* <Mapa></Mapa> */}
      <div className='container'>
        <h1 className='inputLabel'>Ciudades</h1>
        <div className='d-flex' style={{ justifyContent: "end" }}>
          <a href='/operatividad/new'><button className='btn btn-success mx-2'>Añadir ciudad</button></a>
        </div>
        <div className='container'>
          <div className='row row-cols-1 row-cols-md-4 g-4'>
            {
              sucursales.map((sucursal) => {
                return (
                  <Ciudad key={sucursal.idCiudad}
                    idCiudad={sucursal.idCiudad}
                    nombre={sucursal.nombreCiudad}
                    imagen={imagen}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Operatividad