import React, { useEffect, useState } from 'react';
import axios from 'axios'

const SucursalCliente = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { nombre, direccion, tarifaCarro, tarifaMoto, tarifaBici, idSucursal, cuposTotales, cuposDisp, cuposUtilizados, ciudad, imagen } = props
  const [diccionarioCiudades, setDiccionarioCiudades] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/city`);
        const ciudades = response.data;
        const nuevoDiccionario = {};
        for (let i = 0; i < ciudades.length; i++) {
          nuevoDiccionario[ciudades[i].idCiudad] = ciudades[i].nombreCiudad;
        }
        setDiccionarioCiudades(nuevoDiccionario);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${apiUrl}/parking/delete/${idSucursal}`);
      console.log(response);
      window.location.href = '/admin';
      alert('Parqueadero eliminado correctamente');
    } catch (error) {
      console.error(error);
    }
  }

  const linkPath = `/sucursales/${idSucursal}`

  return (
    <div className='col'>
      <div className='card'>
        <img src={imagen} className='cad-img-top'></img>
        <div className='card-body'>
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">Tarifa (Carro): {tarifaCarro} pesos/minuto
            <br></br>Tarifa (Moto): {tarifaMoto} pesos/minuto
            <br></br>Tarifa (Bici): {tarifaBici} pesos/minuto</p>
          <p className="card-text">Cupos Disponibles: {cuposDisp}</p>
          <p className="card-text"><small className="text-body-secondary">{diccionarioCiudades[ciudad]}, {direccion}</small></p>
          <a href={linkPath}><button className='btn btn-success'>Reservar</button></a>
        </div>
      </div>
    </div>
  );
}

export default SucursalCliente