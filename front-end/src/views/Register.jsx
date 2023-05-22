import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../styles/register.css"
import Logo from '../images/Logo.PNG'

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [message, setMessage] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const handleSignup = async () => {
    try{
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password,
        confirmPassword,
        cardNumber
      });
      if (response.status === 200) {
        setMessage('Usuario registrado con éxito');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCardNumber('');
        setRegistrado(true);
      }
    }catch(e){
      console.log(e.response.data);
    }
  };

  const handleCookie = () => {
    console.log(Cookies.get('jwt'));
  }

  return (  

    <div>
      {registrado ? 
          <Link to="/">
            <button>Regresar</button>
          </Link>
        : 
          <div>
            <div id="logo">
              <img src={Logo}  alt="Logotipo"/>
            </div>
            <h1>Registro</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico'/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña'/>
                <input type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmar Contraseña'/>
                <input type='text' id='cardNumber' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Número de tarjeta'/>
              <button onClick={handleSignup} className="btn" >Registrarse</button>
              <button onClick={handleCookie} className="btn" >Obtener Cookie</button>
            </form>
            {<div>{message}</div>}
          </div>
        }
        
    </div>
  );
}

export default Register;