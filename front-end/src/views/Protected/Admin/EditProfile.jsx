import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../../../styles/register.css"
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'

function EditProfile() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const idUser = Cookies.get('idUser');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${idUser}`);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setEmail(response.data.email);
        setUsuario(response.data.usuario);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  const handleSignup = async () => {
    try {
      const response = await axios.put(`${apiUrl}/users/update`, {
        nombre,
        apellido,
        usuario,
        email,
        password,
        idUser
      });
      console.log(response.status)
      if (response.status === 200) {
        setNombre('');
        setApellido('');
        setUsuario('');
        setEmail('');
        setPassword('');
        alert('Usuario actualizado con éxito')
        window.location.href = '/admin';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };


  return (
    <>
      <AdminNav></AdminNav>
      <div className='container'>
        <h1>Actualizacion de Datos</h1>
        <div className='set-middle'>
          <form onSubmit={(e) => e.preventDefault()} className='d-grid'>
            <input className='inputReg' type="text" id="nombre" defaultValue={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
            <input className='inputReg' type="text" id="apellido" defaultValue={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
            <input className='inputReg' type="text" id="usuario" defaultValue={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario' />
            <input className='inputReg' type="text" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
            <input className='inputReg' type='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Nueva Password' />
            <button onClick={handleSignup} className="btn" >Actualizar</button>
            <Link to="/PerfilAdmin">
              <div className="btnLogin">
                <button type="button" className="btn">Cancelar</button>
              </div>
            </Link>
          </form>
        </div>
      </div>
      <Footer></Footer>

    </>
  );
}

export default EditProfile;