import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
// import { Button, Form } from 'react-bootstrap';
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
            <label htmlFor="inputNombre">Nombre Parqueadero:</label>
            <input type="text" className="form-control my-3" id="inputNombre" placeholder="Nombre parqueadero" defaultValue={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <label htmlFor="inputCiudad">Dirección:</label>
            <input type="text" className="form-control my-3" id="inputDir" placeholder="Dirección" defaultValue={direccion} onChange={(e) => setDireccion(e.target.value)}/>
            <label htmlFor="inputTarifa">Tarifa Carro:</label>
            <input type="text" className="form-control my-3" id="inputTarifa" placeholder="Tarifa Carro" defaultValue={tarifaCarro} onChange={(e) => setTarifaCarro(e.target.value)}/>
            <label htmlFor="inputTarifa">Tarifa Moto:</label>
            <input type="text" className="form-control my-3" id="inputTarifa" placeholder="Tarifa Moto" defaultValue={tarifaMoto} onChange={(e) => setTarifaMoto(e.target.value)}/>
            <label htmlFor="inputTarifa">Tarifa Bici:</label>
            <input type="text" className="form-control my-3" id="inputTarifa" placeholder="Tarifa Bici" defaultValue={tarifaBici} onChange={(e) => setTarifaBici(e.target.value)}/>
            <select type="select" className="my-3" id="inputCobertura" value={cobertura} onChange={(e) => setCobertura(e.target.value)} placeholder="Cobertura">
              <option value="1" >Cubierto</option>
              <option value="2">Semi-cubierto</option>
              <option value="3">Descubierto</option>
            </select><br></br>
            <p>Opción seleccionada: {cobertura}</p>
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



        // <div className='container'>
        //     <AdminNav></AdminNav>
        //     <Form>
        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <div className='col-4 set-middle'><Form.Control type="email" placeholder="Enter email" /></div>
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <div className='col-4 set-middle'><Form.Control type="password" placeholder="Password" /></div>
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicCheckbox">
        //             <Form.Check type="checkbox" label="Check me out" />
        //         </Form.Group>
        //         <Button variant="primary" type="submit">
        //             Submit
        //         </Button>
        //     </Form>
        //     <Footer></Footer>
        // </div>