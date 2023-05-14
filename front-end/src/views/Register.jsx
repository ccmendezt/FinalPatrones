import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

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
            <h1>Registro</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email">Correo electronico:</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <label htmlFor="confirmpassword">Confirmar contraseña:</label>
                <input type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div>
                <label htmlFor='cardNumber'>Numero de tarjeta:</label>
                <input type='text' id='cardNumber' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              </div>
              <button onClick={handleSignup}>Registrarse</button>
              <button onClick={handleCookie}>ObtenerCookie</button>
            </form>
            {<div>{message}</div>}
          </div>
        }
        
    </div>
  );
}

export default Register;