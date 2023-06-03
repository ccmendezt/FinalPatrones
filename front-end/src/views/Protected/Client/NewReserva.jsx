import React from 'react'
import Nav from '../../../components/PageComponents/Navbar';
import Footer from '../../../components/PageComponents/Footer';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


function NewReserva() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const id = useParams().id;
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();

  console.log(fecha)
  console.log(hora)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prueba = await axios.get(`${apiUrl}/parking/${id}`);
        console.log(prueba.data.cuposDisp)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className='pt-3 pb-3 backgroundFadeGreen'>
        <div className='container '>
          <div className='card cardLoggin m-auto my-5 py-5'>
            <h1 className='titleIniciarSesion'>Nueva Reserva</h1>
            <h5 className='inputLabel'>Sucursal:</h5>
            <h5 className='inputLabel'>Cupos:</h5>
            <form>
              <div style={{ display: "inline-block" }}>
                <label className="inputLabel">Fecha de la reserva:</label>
                <input type="date" className="form-control inputReg text-center" id="inputDate" placeholder="Usuario" />
                <label className="inputLabel">Hora de inicio reserva:</label>
                <input type="time" className="form-control inputReg text-center" id="inputHoraIni" placeholder="Usuario" />
                <label className="inputLabel">Hora de finalización reserva:</label>
                <input type="time" className="form-control inputReg text-center" id="inputHoraFin" placeholder="Contraseña" />
                <label className="inputLabel">Tipo de vehículo:</label><br></br>
                <select name="tipoVehiculo" id="inputTipoVehiculo" className="form-select">
                  <option value={"C"}>Carro</option>
                  <option value={"M"}>Moto</option>
                  <option value={"B"}>Cicla</option>
                </select>
              </div>
              <div></div>
              <div className="btnLogin">
                <button className="btn" id="btnIniciarSesion">Reservar</button>
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

export default NewReserva