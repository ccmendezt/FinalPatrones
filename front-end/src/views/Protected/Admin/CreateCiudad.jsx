import { useState } from 'react'
import React from 'react'
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import axios from 'axios';

import { Link } from 'react-router-dom';
function CreateCiudad() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [nombre, setNombre] = useState('');

  const handleCreateCity = async () => {
    try {
      const response = await axios.post(`${apiUrl}/city/create`, {
        nombreCiudad: nombre,
      });
      if (response.status === 200) {
        setNombre('');
        alert('Ciudad creada correctamente');
        window.location.href = '/operatividad';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <>
      <AdminNav></AdminNav>
      <div className="container">
        <h1 className="titleIniciarSesion">Añadir Ciudad</h1>
        <form>
          <div style={{ display: "inline-block" }}>
            <input type="text" className="form-control my-3" id="inputNombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre ciudad" />
          </div>
          <Link to="/operatividad">
            <div className="btnSave">
              <button type="button" className="btn btn btn-success" onClick={handleCreateCity}>Guardar</button>
            </div>
          </Link>
        </form >
      </div >
      <Footer></Footer>
    </>
  )
}

export default CreateCiudad