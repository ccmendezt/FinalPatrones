import React, { useState } from "react";
import axios from 'axios';
import "../styles/login.css";
import {
  BrowserRouter as Link
} from 'react-router-dom';

const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(user);
  };

  const onSubmit = () => {
    //Peticion a la API con Axios
    axios.get('http://localhost:5000/api/users/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (

          <div className="container">
            <h1 className="titleIniciarSesion">Iniciar Sesion</h1>
            <form>
              <div className="row mb-3">
                <label for="inputUsuario" className="col-sm-2 col-form-label">Usuariio</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputUsuario" />
                </div>
              </div>
              <div className="row mb-3">
                <label for="inputPassword" className="col-sm-2 col-form-label">Contraseña</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" onChange={ handleChange } />
                </div>
              </div>
              <div className="btnLogin">
                <button type="submit" className="btn btn-primary">Iniciar sesion</button>
              </div>
              <Link to="/Register">
                <div className="btnRegister">
                  <button type="" className="btn btn-primary">Regístrese</button>
                </div>
              </Link>
            </form>
          </div>
  );
};

export default Login;
