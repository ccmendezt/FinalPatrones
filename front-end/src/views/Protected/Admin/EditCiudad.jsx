import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'


function EditCiudad() {
  const id = useParams().id;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [nombre, setNombre] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/city/${id}`);
        setNombre(response.data.nombreCiudad);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/city/update/${id}`, {
        nombreCiudad: nombre,
      });
      alert('Ciudad editado correctamente');
      window.location.href = '/operatividad';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <AdminNav></AdminNav>
      <div className="container">
        <h1 className="titleIniciarSesion">Editar ciudad</h1>
        <form>
          <div style={{ display: "inline-block" }}>
            <label htmlFor="inputNombre">Nombre Ciudad:</label>
            <input type="text" className="form-control my-3" id="inputNombre" placeholder="Nombre parqueadero" defaultValue={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </div>
          <Link to="/operatividad">
            <div className="btnSave">
              <button type="button" className="btn btn btn-success" onClick={handleEdit}>Guardar</button>
            </div>
            <div className="btnCancel">
              <button type="button" className="btn btn btn-success">Cancelar</button>
            </div>
          </Link>
        </form >
      </div >
      <Footer></Footer>
    </>
  )
}

export default EditCiudad