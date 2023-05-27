import axios from 'axios';
import Cookies from 'js-cookie';

const checkAuthentication = async () => {
  const jwt = Cookies.get('miCookie');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  const apiUrl = process.env.REACT_APP_API_URL;

  if (jwt) {

    try {
      const response = await axios.get(`${apiUrl}/verifyToken`);
      if (response.statusToken == true) {
        console.log('El token es válido y ha sido verificado en el backend');
        return true;
      }
      return false;
      // if (response.data.valid) {
      //   // El token es válido y ha sido verificado en el backend
      //   return true;
      // } else {
      //   // El token no es válido o ha expirado
      //   return false;
      // }
    } catch (error) {
      console.error('Error al verificar el token JWT:', error);
      return false;
    }
  }

  // No se encontró el token JWT en las cookies
  return false;
};

export default checkAuthentication;