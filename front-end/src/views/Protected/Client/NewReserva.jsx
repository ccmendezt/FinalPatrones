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

  const [numeroReservas, setNumeroReservas] = useState(0);

  const [datos, setDatos] = useState({});
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cupos, setCupos] = useState('');
  const [tarifaCarro, setTarifaCarro] = useState(0);
  const [tarifaMoto, setTarifaMoto] = useState(0);
  const [tarifaCicla, setTarifaCicla] = useState(0);

  const [tipoReserva, setTipoReserva] = useState('U');
  const [fecha, setFecha] = useState('');
  const [fechaFin, setFechaFin] = useState('');
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
        setTarifaCarro(response.data.tarifaCarro);
        setTarifaMoto(response.data.tarifaMoto);
        setTarifaCicla(response.data.tarifaBici);

        const response2 = await axios.get(`${apiUrl}/users/${idUser}`);
        setNumeroReservas(response2.data.maximoReservas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleReserv = async () => {
    if (numeroReservas === 5) {
      alert('Ya tiene el maximo de reservas activas');
      return;
    }
    if (tipoReserva === 'S') {
      if (fecha === '' || fechaFin === '') {
        alert('Debe ingresar las fechas de inicio y fin de la reserva');
        return;
      }
    }

    if (tipoReserva === 'U') {
      if (fecha === '') {
        alert('Debe ingresar la fecha de la reserva');
        return;
      }
    }

    if (horaIni === '' || horaFin === '') {
      alert('Debe ingresar las horas de inicio y fin de la reserva');
      return;
    }

    if(tipoVehiculo === 'C' || tipoVehiculo === 'M') {
      if (placa === undefined) {
        alert('Debe ingresar la placa del vehiculo');
        return;
      }
    }

    if (tipoReserva === 'S') {
      if (new Date(fecha) > new Date(fechaFin)) {
        alert('La fecha de inicio debe ser menor a la fecha de finalización');
        return;
      }
    }
    
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');
    const fechaActualFormatted = `${year}-${month}-${day}`;

    console.log(fecha);
    console.log(fechaActualFormatted);

    if (fecha < fechaActualFormatted) {
      alert('La fecha de la reserva debe ser mayor a la fecha actual');
      return;
    }

    if (new Date(fecha) === new Date()) {
      if (new Date(horaIni) < new Date().getHours()) {
        alert('La hora de inicio debe ser mayor a la hora actual');
        return;
      }
    }

    if (new Date(fecha) === new Date()) {
      if (new Date(horaIni) === new Date().getHours()) {
        if (new Date(horaIni) < new Date().getMinutes()) {
          alert('La hora de inicio debe ser mayor a la hora actual');
          return;
        }
      }
    }

    if(tipoReserva === 'S') {
      if (fecha === fechaFin) {
        alert('La fecha de inicio y fin de la reserva no pueden ser iguales');
        return;
      }
    }
        

    const FechaSisR = fechaActualFormatted;

    try {
      if(tipoReserva === 'U') {
        const response = await axios.post(`${apiUrl}/reserv/create`, {
          fechaReserva: fecha,
          horaInicioR: horaIni,
          horaFinR: horaFin,
          idParqueadero: id,
          idUsuario: idUser,
          placaVehiculo: placa,
          tipoVehiculo,
          tipoReserva,
          FechaSisR
        });
        console.log(response.status);
        if (response.status === 200) {
          alert('Reserva creada con exito!!');
          window.location.href = '/reservas';
          alert('Recuerda!! tienes 5 minutos para llegar al parqueadero despues de la hora de inicio de la reserva o esta sera cancelada');
        }
      } else {
        const response = await axios.post(`${apiUrl}/reserv/create`, {
          fechaReserva: fecha,
          fechaFinReserva: fechaFin,
          horaInicioR: horaIni,
          horaFinR: horaFin,
          idParqueadero: id,
          idUsuario: idUser,
          placaVehiculo: placa,
          tipoVehiculo,
          tipoReserva,
          FechaSisR
        });
        console.log(response.status);
        if (response.status === 200) {
          alert('Reserva realizada con exito!!');
          window.location.href = '/reservas';
          alert('Recuerda!! Esta reserva ya fue pagada, la puedes cancelar antes de entrar al parqueadero y recibir el reembolso, una vez ingreses al parqueadero no se hara reembolso');
        }
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
                <label className="inputLabel">Tipo de reserva:</label><br></br>
                  <select name="tipoReserva" id="inputTipoReserva" className="form-select" onChange={(e) => setTipoReserva(e.target.value)}>
                    <option value={"U"}>Unica</option>
                    <option value={"S"}>Semanal</option>
                  </select>
                {tipoReserva === 'S' ?
                  <>
                    <label className="inputLabel">Fecha de inicio reserva:</label>
                    <input type="date" className="form-control inputReg text-center" id="inputDate" onChange={(e) => setFecha(e.target.value)} placeholder="Usuario" />
                    <label className="inputLabel">Fecha de finalización reserva:</label>
                    <input type="date" className="form-control inputReg text-center" id="inputDate" onChange={(e) => setFechaFin(e.target.value)} placeholder="Usuario" />
                  </>
                  :
                  <>
                    <label className="inputLabel">Fecha de la reserva:</label>
                    <input type="date" className="form-control inputReg text-center" id="inputDate" onChange={(e) => setFecha(e.target.value)} placeholder="Usuario" />
                  </>
                }
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
                {tipoVehiculo === 'C' || tipoVehiculo === 'M' ?
                  <>
                    <label className="inputLabel">Placa del vehículo:</label>
                    <input type="text" className="form-control inputReg text-center" id="placaVehiculo" value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder='Ingrese la placa' />
                  </>
                    :
                  <>
                  </>
                }
                
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