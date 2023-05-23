import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../styles/register.css"
import Logo from '../images/Logo.PNG'

function Register() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [message, setMessage] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        nombre,
        apellido,
        usuario,
        email,
        cardNumber
      });
      if (response.status === 200) {
        setMessage('Usuario registrado con éxito');
        setNombre('');
        setApellido('');
        setUsuario('');
        setEmail('');
        setCardNumber('');
        setRegistrado(true);
        window.location.href = '/home';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (

    <div>
        <div>
          <div id="logo">
            <img src={Logo} style={{ width: 'auto' }} alt="Logotipo" />
          </div>
          <h1>Registro</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
            <input type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario' />
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
            {/* <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
            <input type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmar Contraseña' /> */}
            <input type='text' id='cardNumber' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Número de tarjeta' />
            <button onClick={handleSignup} className="btn" >Registrarse</button>
            <Link to="/">
              <div className="btnLogin">
                <button type="button" className="btn">Cancelar</button>
              </div>
            </Link>
          </form>
          {<div>{message}</div>}
        </div>
    </div>
  );
}

export default Register;