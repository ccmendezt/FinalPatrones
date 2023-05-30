import { useState, useEffect } from 'react'
import React from 'react'
import AdminNav from '../components/PageComponents/AdminNav'
import Footer from '../components/PageComponents/Footer'
import axios from 'axios';

import { Link } from 'react-router-dom';
function Create() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cupo, setCupo] = useState('');
  const [tarifaCarro, setTarifaCarro] = useState('');
  const [tarifaMoto, setTarifaMoto] = useState('');
  const [tarifaBici, setTarifaBici] = useState('');
  const [cobertura, setCobertura] = useState('1');
  const [inicioHorario, setInicioHorario] = useState('');
  const [finHorario, setFinHorario] = useState('');


  const handleCreateParking = async () => {
    try {
      const response = await axios.post(`${apiUrl}/parking/create`, {
        nombre,
        ciudad,
        direccion,
        cupo,
        // tarifaCarro,
        // tarifaMoto,
        // tarifaBici,
        cobertura
        // inicioHorario,
        // finHorario
      });
      if (response.status === 200) {
        setNombre('');
        setCiudad('');
        setDireccion('');
        setCupo('');
        setTarifaCarro('');
        setTarifaMoto('');
        setTarifaBici('');
        setCobertura('');
        setInicioHorario('');
        setFinHorario('');
        window.location.href = '/admin';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <>
      <AdminNav></AdminNav>
      <div className="container">
        <h1 className="titleIniciarSesion">Nuevo parqueadero</h1>
        <form>
          <div style={{ display: "inline-block" }}>
            <input type="text" className="form-control my-3" id="inputNombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre parqueadero" />
            <input type="text" className="form-control my-3" id="inputCiu" value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" />
            <input type="text" className="form-control my-3" id="inputDir" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" />
            <input type="text" className="form-control my-3" id="inputCupo" value={cupo} onChange={(e) => setCupo(e.target.value)} placeholder="Cupos" />
            {/* <input type="text" className="form-control my-3" id="inputTarifa" value={tarifaCarro} onChange={(e) => setTarifaCarro(e.target.value)} placeholder="Tarifa Carro" />
            <input type="text" className="form-control my-3" id="inputTarifa" value={tarifaMoto} onChange={(e) => setTarifaMoto(e.target.value)} placeholder="Tarifa Moto" />
            <input type="text" className="form-control my-3" id="inputTarifa" value={tarifaBici} onChange={(e) => setTarifaBici(e.target.value)} placeholder="Tarifa Bici" /> */}
            <select type="select" className="my-3" id="inputCobertura" value={cobertura} onChange={(e) => setCobertura(e.target.value)} placeholder="Cobertura">
              <option value="1" >Cubierto</option>
              <option value="2">Semi-cubierto</option>
              <option value="3">Descubierto</option>
            </select><br></br>
            <p>Opción seleccionada: {cobertura}</p>

            <input type="checkbox" className="my-3" id="checkHorario" name='checkHorario' />
            <label htmlFor="checkHorario"> 24/7</label>
            <select type="select" className="m-3 " id="inicioHorario" >
              <option value="1">00:00</option>
              <option value="2">01:00</option>
              <option value="02">02:00</option>
              <option value="03">03:00</option>
              <option value="04">04:00</option>
              <option value="05">05:00</option>
              <option value="06">06:00</option>
              <option value="07">07:00</option>
              <option value="08">08:00</option>
              <option value="09">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
              <option value="24">24:00</option>
            </select>
            <select type="select" className="m-3" id="finHorario" >
              <option value="1">00:00</option>
              <option value="2">01:00</option>
              <option value="02">02:00</option>
              <option value="03">03:00</option>
              <option value="04">04:00</option>
              <option value="05">05:00</option>
              <option value="06">06:00</option>
              <option value="07">07:00</option>
              <option value="08">08:00</option>
              <option value="09">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
              <option value="24">24:00</option>
            </select>
          </div>
          <Link to="/admin">
            <div className="btnSave">
              <button type="button" className="btn btn btn-success" onClick={handleCreateParking}>Guardar</button>
            </div>
          </Link>
        </form >
      </div >
      <Footer></Footer>
    </>
  )
}

export default Create