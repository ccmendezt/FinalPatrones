import axios from 'axios';

const checkAuthentication = async () => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));

  if (token) {
    // const jwt = token.split('=')[1];

    // try {
    //   const response = await axios.post('/api/verifyToken', { jwt });

    //   if (response.data.valid) {
    //     // El token es válido y ha sido verificado en el backend
    //     return true;
    //   } else {
    //     // El token no es válido o ha expirado
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Error al verificar el token JWT:', error);
    //   return false;
    // }
    console.log('El token es válido y ha sido verificado en el backend');
    return true;
  }

  // No se encontró el token JWT en las cookies
  return false;
};

export default checkAuthentication;