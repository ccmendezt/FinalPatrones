import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'


function Edit() {
  const id = useParams().id;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tarifaCarro, setTarifaCarro] = useState('');
  const [tarifaMoto, setTarifaMoto] = useState('');
  const [tarifaBici, setTarifaBici] = useState('');
  const [cobertura, setCobertura] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/parking/${id}`);
        const parqueadero = response.data;
        setNombre(parqueadero.nombreParqueadero);
        setDireccion(parqueadero.direccion);
        setTarifaCarro(parqueadero.tarifaCarro);
        setTarifaMoto(parqueadero.tarifaMoto);
        setTarifaBici(parqueadero.tarifaBici);
        setCobertura(parqueadero.idTipoParqueadero);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/parking/update`, {
        nombreParqueadero: nombre,
        direccion: direccion,
        tarifaCarro: tarifaCarro,
        tarifaMoto: tarifaMoto,
        tarifaBici: tarifaBici,
        cobertura: cobertura,
        idParqueadero: id
      });
      console.log(response);
      alert('Parqueadero editado correctamente');
      window.location.href = '/admin';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* Componente de form para parqueadero */}
      <AdminNav></AdminNav>
      <div className="container">
        <h1 className="titleIniciarSesion">Editar parqueadero</h1>
        <form>
          <div style={{ display: "inline-block" }}>
          <label htmlFor="inputNombre"><b>Nombre Parqueadero:</b></label>
            <input type="text" className="form-control my-3" id="inputNombre" placeholder="Nombre parqueadero" defaultValue={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <label htmlFor="inputDir"><b>Dirección:</b></label>
            <input type="text" className="form-control my-3" id="inputDir" placeholder="Dirección" defaultValue={direccion} onChange={(e) => setDireccion(e.target.value)}/>
            <label htmlFor="inputTarifa1"><b>Tarifa Carro:</b></label>
            <input type="text" className="form-control my-3" id="inputTarifa1" placeholder="Tarifa Carro" defaultValue={tarifaCarro} onChange={(e) => setTarifaCarro(e.target.value)}/>
            <label htmlFor="inputTarifa2"><b>Tarifa Moto:</b></label>
            <input type="text" className="form-control my-3" id="inputTarifa2" placeholder="Tarifa Moto" defaultValue={tarifaMoto} onChange={(e) => setTarifaMoto(e.target.value)}/>
            <label htmlFor="inputTarifa3"><b>Tarifa Bici:</b></label>
            <input type="text" className="form-control my-3" id="inputTarifa3" placeholder="Tarifa Bici" defaultValue={tarifaBici} onChange={(e) => setTarifaBici(e.target.value)}/>
            <label htmlFor="inputCobertura"><b>Cobertura:</b></label><br />
            <select type="select" className="my-3" id="inputCobertura" value={cobertura} onChange={(e) => setCobertura(e.target.value)} placeholder="Cobertura">
              <option value="1" >Cubierto</option>
              <option value="2">Semi-cubierto</option>
              <option value="3">Descubierto</option>
            </select><br />
          </div>
          <Link to="/admin">
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

export default Edit