import axios from 'axios';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/register.css"
import Logo from '../../../images/Logo.PNG'
import ReCaptcha from "react-google-recaptcha"

function Register() {
  const captchaRef = useRef(null)
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [message, setMessage] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSignup = async () => {
    const tokenCaptcha = captchaRef.current.getValue();
    captchaRef.current.reset();
    try {
      const response = await axios.post(`${apiUrl}/users/createAdmin`, {
        nombre,
        apellido,
        usuario,
        email,
        tokenCaptcha
      });
      if (response.status === 200) {
        setNombre('');
        setApellido('');
        setUsuario('');
        setEmail('');
        setRegistrado(true);
        alert('Administrador registrado con éxito');
        window.location.href = '/admin';
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
        <h1>Registro de Administrador</h1>
        <div className='set-middle'>
          <form onSubmit={(e) => e.preventDefault()} className='d-grid'>
            <input className='inputReg' type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
            <input className='inputReg' type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
            <input className='inputReg' type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario' />
            <input className='inputReg' type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
            <div className="captcha">
              <ReCaptcha sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
            </div>
            <button onClick={handleSignup} className="btn" style={{ maxWidth: "250px" }}>Registrar Administrador</button>
            <Link to="/admin">
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