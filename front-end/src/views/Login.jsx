import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/login.css";
import "../styles/main.css";
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.PNG'

const Login = () => {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  // const miCookie = Cookies.get('miCookie');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        usuario,
        password
      });
      if (response.status === 200) {
        console.log(response.data);
        Cookies.set('jwt', response.data.token, { expires: (1 / 24 / 60) * 2 }); // 2 minutos
        window.location.href = '/home';
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (

    <div className="container">
      <div id="logo">
        <img src={Logo} style={{ width: 'auto' }} alt="Logotipo" />
      </div>
      <h1 className="titleIniciarSesion">Iniciar Sesión</h1>
      <form>
        <div style={{ display: "inline-block" }}>
          <input type="text" value={usuario} className="form-control" id="inputUsuario" onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" />
          <input type="password" value={password} className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        </div>
        <div className="btnLogin">
          <button onClick={handleLogin} className="btn" id="btnIniciarSesion">Iniciar Sesion</button>
        </div>
        <Link to="/register">
          <div className="btnRegister">
            <button type="button" className="btn">Regístrese</button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Login;
