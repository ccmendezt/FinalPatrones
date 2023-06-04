import React, { useEffect, useState } from 'react';
import Footer from '../../../components/PageComponents/Footer'
import Nav from '../../../components/PageComponents/Navbar'
import imagen from '../../../images/CAR.jpg';
import Ciudad from '../../../components/CiudadById';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function CiudadesId() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const id = useParams().id;
  const [sucursales, setSucursales] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/parking/city/${id}`);
        setSucursales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (sucursales.length === 0) {
    return (
      <>
        <Nav></Nav>
        <h2 className='container inputLabel'>En este momento no hay parqueaderos disponibles</h2>
        <Footer></Footer>
      </>
    )
  } else {
    return (
      <div>
        <Nav></Nav>
        <div className='container'>
          <div className='row row-cols-1 row-cols-md-4 g-4'>
            {
              sucursales.map((sucursal) => {
                return (
                  <Ciudad key={sucursal.idParqueadero}
                    nombre={sucursal.nombreParqueadero}
                    direccion={sucursal.direccion}
                    tarifaCarro={sucursal.tarifaCarro}
                    tarifaMoto={sucursal.tarifaMoto}
                    tarifaBici={sucursal.tarifaBici}
                    idSucursal={sucursal.idParqueadero}
                    cuposTotales={sucursal.cuposTotales}
                    cuposDisp={sucursal.cuposDisp}
                    cuposUtilizados={sucursal.cuposUtilizados}
                    ciudad={sucursal.idCiudad}
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
}

export default CiudadesId