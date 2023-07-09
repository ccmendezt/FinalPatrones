import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../../../styles/register.css"
import Footer from '../../../components/PageComponents/Footer'
import Nav from '../../../components/PageComponents/Navbar';

function EditProfileClient() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [card, setCard] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const idUser = Cookies.get('idUser');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,20}$/;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prueba = await axios.get(`${apiUrl}/parking/1`);
        console.log(prueba)
        const response = await axios.get(`${apiUrl}/users/${idUser}`);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setEmail(response.data.email);
        setUsuario(response.data.usuario);
        const responseCard = await axios.get(`${apiUrl}/card/id/${response.data.idTarjeta}`);
        setCard(responseCard.data.numeroTarjeta);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSignup = async () => {
    if (!passwordRegex.test(password)) {
      alert('La contraseña debe tener minimo 8 caracteres y maximo 20, una mayúscula, una minúscula, un número y un caracter especial (!@#$%^&*())');
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/users/updateclient`, {
        nombre,
        apellido,
        usuario,
        email,
        password,
        card,
        primerIngreso: 0,
        idUser
      });
      if (response.status === 200) {
        setNombre('');
        setApellido('');
        setUsuario('');
        setEmail('');
        setPassword('');
        setCard('');
        alert('Usuario actualizado con éxito')
        window.location.href = '/home';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };


  return (
    <>
      <Nav></Nav>
      <div className='container'>
        <div className='card cardLoggin m-auto my-5 py-5'>
          <h1>Actualizacion de Datos</h1>
          <div className='set-middle'>
            <form onSubmit={(e) => e.preventDefault()} className='d-grid'>
              <input className='inputReg' type="text" id="nombre" defaultValue={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
              <input className='inputReg' type="text" id="apellido" defaultValue={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
              <input className='inputReg' type="text" id="usuario" defaultValue={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario' />
              <input className='inputReg' type="text" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
              <input className='inputReg' type="text" id="card" defaultValue={card} onChange={(e) => setCard(e.target.value)} placeholder='Numero de Tarjeta' />
              <input className='inputReg' type='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Nueva Password' />
              <button onClick={handleSignup} className="btn" >Actualizar</button>
              <Link to="/perfil">
                <div className="btnLogin">
                  <button type="button" className="btn">Cancelar</button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>

    </>
  );
}

export default EditProfileClient;