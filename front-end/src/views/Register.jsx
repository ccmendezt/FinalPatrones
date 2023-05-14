import { useState } from 'react';
import {
  BrowserRouter as Link
} from 'react-router-dom';

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [message, setMessage] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const handleSignup = async () => {
    const response = await fetch('http://localhost:-------------------', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmPassword, cardNumber})
    });
    const data = await response.json();
    if (response.ok) {
      setMessage('Usuario registrado con éxito');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setCardNumber('');
      setRegistrado(true);
    } else {
      setMessage(data.error);
    }
  };

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
                <label htmlFor="username">Correo electronico:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
            </form>
            {/* <div>{message}</div> */}
          </div>
        }
        
    </div>
  );
}

export default Register;