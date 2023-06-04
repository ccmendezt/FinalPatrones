import React from 'react'
import Nav from '../../../components/PageComponents/Navbar';
import Footer from '../../../components/PageComponents/Footer';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function NewReserva() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const id = useParams().id;
  const idUser = parseInt(Cookies.get('idUser'));
  // const fecha = new Date().toLocaleDateString();
  // const hora = new Date().toLocaleTimeString();

  const [datos, setDatos] = useState({});
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cupos, setCupos] = useState('');

  const [fecha, setFecha] = useState('');
  const [horaIni, setHoraIni] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('C');
  const [placa, setPlaca] = useState(undefined);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/parking/${id}`);
        console.log(response.data)
        setDatos(response.data);
        setNombre(response.data.nombreParqueadero);
        setDireccion(response.data.direccion);
        setCupos(response.data.cuposDisp);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleReserv = async () => {
    try {
      const response = await axios.post(`${apiUrl}/reserv/create`, {
        fechaReserva: fecha,
        horaInicioR: horaIni,
        horaFinR: horaFin,
        idParqueadero: id,
        idUsuario: idUser,
        placaVehiculo: placa,
        tipoVehiculo
      });
      console.log(response.status);
      if (response.status === 200) {
        window.location.href = '/reservas';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };


  return (
    <>
      <Nav></Nav>
      <div className='pt-3 pb-3 backgroundFadeGreen'>
        <div className='container '>
          <div className='card cardLoggin m-auto my-5 py-5'>
            <h1 className='titleIniciarSesion'>Nueva Reserva</h1>
            <h5 className='inputLabel'>Datos Sucursal:</h5>
              {datos ? 
                <div className='row'>
                  <div className='col-6 m-auto'>
                    <h5 className='inputLabel'>Nombre:</h5>
                    <p type="text" className="form-control inputReg text-center" id="Nombre" placeholder="Nombre">{nombre}</p>
                    <h5 className='inputLabel'>Direccion:</h5>
                    <p type="text" className="form-control inputReg text-center" id="Direccion" placeholder="Direccion">{direccion}</p>
                  </div>
                </div>
                : 
                  <div className='row'>
                    <div className='col-6'>
                      <p>....Cargando</p>
                    </div>
                  </div>
                }
            <h5 className='inputLabel'>Cupos:</h5>
            {datos ?
              <div className='row'>
                <div className='col-6 m-auto'>
                  <p type="text" className="form-control inputReg text-center" id="Cupos" placeholder="Cupos">{cupos}</p>
                </div>
              </div>
              :
              <div className='row'>
              </div>
              }
            <form>
              <div style={{ display: "inline-block" }}>
                <label className="inputLabel">Fecha de la reserva:</label>
                <input type="date" className="form-control inputReg text-center" id="inputDate" onChange={(e) => setFecha(e.target.value)} placeholder="Usuario" />
                <label className="inputLabel">Hora de inicio reserva:</label>
                <input type="time" className="form-control inputReg text-center" id="inputHoraIni" onChange={(e) => setHoraIni(e.target.value)} placeholder="Usuario" />
                <label className="inputLabel">Hora de finalización reserva:</label>
                <input type="time" className="form-control inputReg text-center" id="inputHoraFin" onChange={(e) => setHoraFin(e.target.value)} placeholder="Contraseña" />
                <label className="inputLabel">Tipo de vehículo:</label><br></br>
                <select name="tipoVehiculo" id="inputTipoVehiculo" className="form-select" onChange={(e) => setTipoVehiculo(e.target.value)}>
                  <option value={"C"}>Carro</option>
                  <option value={"M"}>Moto</option>
                  <option value={"B"}>Cicla</option>
                </select>
                <input type="text" name="placaVehiculo" id="placaVehiculo" value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder='Ingrese la placa del vehiculo' />
                <p>La placa es: {placa}</p>
              </div>
              <div></div>
              <div className="btnLogin">
                <button className="btn" id="btnIniciarSesion" onClick={handleReserv}>Reservar</button>
              </div> 
            </form>
          </div>
        </div>
      </div>
      <hr></hr>
      <Footer></Footer>
    </>
  )
}

export default NewReserva