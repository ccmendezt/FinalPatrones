const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const { promisify } = require('util');

//Metodo para logear un usuario
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const password = req.body.password;
    connectionDB.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
      if(results.lenght == 0){ //Añadir validacion de password incorrecta
        console.log(error);
      }else{//Inicio de sesión OK
        const id = results[0].id;
        const token = jwt.sign({ id:id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });
        console.log("El token es: " + token);
        const cookieOptions = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
          httpOnly: true
        }
        res.cookie('jwt', token, cookieOptions);
      }
    });
  }catch (error) {
    console.log(error);
  }   
}