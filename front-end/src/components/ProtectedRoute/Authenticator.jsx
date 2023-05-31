import axios from 'axios';
import Cookies from 'js-cookie';

const checkAuthentication = async () => {
  const jwt = Cookies.get('jwt');
  const apiUrl = process.env.REACT_APP_API_URL;
  const config = {
    headers: {
      Authorization: jwt
    }
  };

  try {
    const response = await axios.get(`${apiUrl}/jwt/`, config);
    if (response.data.statusToken == true) {
      console.log('El token es válido y ha sido verificado en el backend');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al verificar el token JWT:', error);
    return false;
  }
};

export default checkAuthentication;