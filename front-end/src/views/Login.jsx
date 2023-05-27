import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/login.css";
import "../styles/main.css";
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.PNG'
import ReCaptcha from "react-google-recaptcha"
import Autenticador from '../components/Authenticator';


const Login = () => {
  const captchaRef = useRef(null)
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    const tokenCaptcha = captchaRef.current.getValue();
    captchaRef.current.reset();
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        usuario,
        password,
        tokenCaptcha
      });
      if (response.status === 200) {
        console.log(response.data);
        Cookies.set('jwt', response.data.token, { expires: (1 / 24 / 60) * 30 }); // 30 minutos
        //console.log(Cookies.get('jwt'));
        
        window.location.href = '/home';
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (

    <div className="container">
      <div className="card cardLoggin m-auto my-5 py-5">

        <div id="logo">
          <img src={Logo} style={{ width: 'auto' }} alt="Logotipo" />
        </div>
        <h1 className="titleIniciarSesion">Iniciar Sesión</h1>
        <form>
          <div style={{ display: "inline-block" }}>
            <input type="text" value={usuario} className="form-control inputReg" id="inputUsuario" onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" />
            <input type="password" value={password} className="form-control inputReg" id="inputPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
          </div>
          <div className="captcha">
            <ReCaptcha sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
          </div>
          <div className="btnLogin">
            <button onClick={handleLogin} className="btn" id="btnIniciarSesion">Iniciar Sesion</button>
          </div>
        </form>
        <div className="btnRegister">
          <Link to="/register">
            <button type="button" className="btn">Regístrese</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
