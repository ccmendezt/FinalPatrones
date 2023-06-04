import axios from 'axios';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/register.css"
import Logo from '../../images/Logo.PNG'
import ReCaptcha from "react-google-recaptcha"

function Register() {
  const captchaRef = useRef(null)
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [message, setMessage] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSignup = async () => {
    const tokenCaptcha = captchaRef.current.getValue();
    captchaRef.current.reset();
    try {
      const response = await axios.post(`${apiUrl}/users/register`, {
        nombre,
        apellido,
        usuario,
        email,
        cardNumber,
        tokenCaptcha
      });
      if (response.status === 200) {
        setMessage('Usuario registrado con éxito');
        setNombre('');
        setApellido('');
        setUsuario('');
        setEmail('');
        setCardNumber('');
        setRegistrado(true);
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (

    <div className='container'>
      <div className="card m-auto my-5 py-5">
        <div id="logo">
          <img src={Logo} style={{ width: 'auto' }} alt="Logotipo" />
        </div>
        <h1>Registro</h1>
        <div className='set-middle'>
          <form onSubmit={(e) => e.preventDefault()} className='d-grid'>
            <input className='inputReg' type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
            <input className='inputReg' type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
            <input className='inputReg' type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario' />
            <input className='inputReg' type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
            {/* <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
            <input type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmar Contraseña' /> */}
            <input className='inputReg' type='text' id='cardNumber' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Número de tarjeta' />
            <div className="captcha">
              <ReCaptcha sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
            </div>
            <button onClick={handleSignup} className="btn" >Registrarse</button>
            <Link to="/">
              <div className="btnLogin">
                <button type="button" className="btn">Cancelar</button>
              </div>
            </Link>
          </form>
        </div>
        {<div>{message}</div>}
      </div>
    </div>
  );
}

export default Register;