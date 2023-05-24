import React from 'react'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'

import { Link } from 'react-router-dom';
function Create() {
  return (
    <>
            <AdminNav></AdminNav>
            <div className="container">
                <h1 className="titleIniciarSesion">Nuevo parqueadero</h1>
                <form>
                    <div style={{ display: "inline-block" }}>
                        <input type="text" className="form-control my-3" id="inputNombre" placeholder="Nombre parqueadero" />
                        <input type="text" className="form-control my-3" id="inputDir" placeholder="Dirección" />
                        <input type="text" className="form-control my-3" id="inputCupo" placeholder="Cupos" />
                        <input type="text" className="form-control my-3" id="inputTarifa" placeholder="Tarifa" />
                        <select type="select" className="my-3" id="inputCobertura" placeholder="Cobertura">
                            <option value="cubierto">Cubierto</option>
                            <option value="descubierto">Descubierto</option>
                            <option value="semi-cubierto">Semi-cubierto</option>
                        </select><br></br>
                        <input type="checkbox" className="my-3" id="checkHorario" name='checkHorario' />
                        <label for="checkHorario"> 24/7</label>
                        <select type="select" className="m-3 " id="inicioHorario" >
                            <option value="00">00:00</option>
                            <option value="01">01:00</option>
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
                        <option value="00">00:00</option>
                            <option value="01">01:00</option>
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
                            <button type="button" className="btn btn btn-success">Guardar</button>
                        </div>
                    </Link>
                </form >
            </div >
            <Footer></Footer>
        </>
  )
}

export default Create