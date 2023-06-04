import React, { useEffect, useState } from 'react';
import Footer from '../../../components/PageComponents/Footer'
import Nav from '../../../components/PageComponents/Navbar'
import imagen from '../../../images/CAR.jpg';
import Sucursal from '../../../components/SucursalCliente';
import axios from 'axios'

function Sucursales() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sucursales, setSucursales] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/parking`);
        setSucursales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Nav></Nav>
      <div className='container'>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
          {
            sucursales.map((sucursal) => {
              return (
                <Sucursal key={sucursal.idParqueadero}
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

export default Sucursales