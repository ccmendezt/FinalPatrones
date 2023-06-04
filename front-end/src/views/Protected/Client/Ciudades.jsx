import React, { useEffect, useState } from 'react';
import Footer from '../../../components/PageComponents/Footer'
import Nav from '../../../components/PageComponents/Navbar'
import imagen from '../../../images/CAR.jpg';
import Ciudad from '../../../components/CiudadCliente';
import axios from 'axios'

function Ciudades() {
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
      <Nav></Nav>
      <h1 className='inputLabel'>Ciudades</h1>
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
      <Footer></Footer>
    </div >
  )
}

export default Ciudades