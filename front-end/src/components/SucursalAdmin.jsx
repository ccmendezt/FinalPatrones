import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Sucursal = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { nombre, direccion, tarifaCarro, tarifaMoto, tarifaBici, idSucursal, cuposTotales, cuposDisp, cuposUtilizados, ciudad } = props
  const [diccionarioCiudades, setDiccionarioCiudades] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/city`);
        const ciudades = response.data;
        const nuevoDiccionario = {};
        for(let i = 0; i < ciudades.length; i++){
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
      alert('No se pudo eliminar el parqueadero');
    }
  }

  
  return (
    <div className='card my-3'>
      <div className='card-body d-flex' >
        <div className='col-8 text-left'>
          <h3>Sucursal: {nombre} </h3>
          <div><b>Dirección:</b> {direccion} </div>
          <div><b>Ciudad:</b> {diccionarioCiudades[ciudad]} </div>
          <div><b>Tarifa Carro:</b> {tarifaCarro} pesos/minuto</div>
          <div><b>Tarifa Moto:</b> {tarifaMoto} pesos/minuto</div>
          <div><b>Tarifa Bici:</b> {tarifaBici} pesos/minuto</div>
          <div><b>Cupos totales:</b> {cuposTotales} </div>
          <div><b>Cupos disponibles:</b> {cuposDisp} </div>
          <div><b>Cupos utilizados:</b> {cuposUtilizados} </div>
        </div>
        <div className='d-flex set-middle'>
          <Link to={"/sucursal/edit/" + idSucursal}><button className='btn btn-success mx-2'>Editar</button></Link>
          <a><button className='btn btn-danger mx-2' onClick={handleDelete}>Eliminar</button></a>
        </div>
      </div>
    </div>
  );
}

export default Sucursal