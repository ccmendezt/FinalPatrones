import React, { useState } from "react";
import axios from 'axios';
import "../styles/login.css";
import { Link } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try{
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      if(response.status === 200){
        console.log("Hlaaaaa");
        console.log(response.data);
        // localStorage.setItem('jwt', response.data.jwt);
      }
    }catch(e){
      console.log(e.response.data);
    }
  }

return (

  <div className="container">
    <h1 className="titleIniciarSesion">Iniciar Sesion</h1>
    <form>
      <div className="row mb-3">
        <label hmtlFor="inputUsuario" className="col-sm-2 col-form-label">Usuariio</label>
        <div className="col-sm-10">
          <input type="text" value={email} className="form-control" id="inputUsuario" onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="row mb-3">
        <label hmtlFor="inputPassword" className="col-sm-2 col-form-label">Contraseña</label>
        <div className="col-sm-10">
          <input type="password" value={password} className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="btnLogin">
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>Iniciar sesion</button>
      </div>
      <Link to="/register">
        <div className="btnRegister">
          <button type="" className="btn btn-primary">Regístrese</button>
        </div>
      </Link>
    </form>
  </div>
);
};

export default Login;
