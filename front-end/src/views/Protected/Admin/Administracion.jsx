import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import axios from 'axios'
import Sucursal from '../../../components/SucursalAdmin';

function Administracion() {
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
      <AdminNav></AdminNav>
      <div className='container'>
        <div className='d-flex' style={{ justifyContent: "end" }}>
          <a href='/sucursal/new'><button className='btn btn-success mx-2'>Nuevo parqueadero</button></a>
        </div>
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
              />
            )
          })
        }
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Administracion