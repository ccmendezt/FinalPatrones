const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const { promisify } = require('util');

//Metodo para registrar un usuario
exports.register = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const cardNumber = req.body.cardNumber;

    if (password !== confirmPassword || password === "" || confirmPassword === "" || email === "" || cardNumber === "") {
      //res.send("Las contraseñas no coinciden");
      console.log("Las contraseñas no coinciden");
    } else {
      let passHash = await bcryptjs.hash(password, 8);
      //console.log(passHash);
      connectionDB.query("INSERT INTO users (email, password, creditCard) VALUES (?, ?, ?)", [email, passHash, cardNumber], (err, result) => {
        if (err) { console.log(err) };
        //res.status(200).json({ data: result });
        // console.log(result);
        res.send("Usuario registrado correctamente")

      })
    }
  } catch (error) {
    console.log(error);
  }
}

//Metodo para logear un usuario
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const password = req.body.password;
    const sql = 'SELECT * FROM users';


    // connectionDB.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
    //   if(results.lenght == 0){ //Añadir validacion de password incorrecta
    //     console.log(error);
    //   }else{//Inicio de sesión OK
    //     const id = results[0].id;
    //     const token = jwt.sign({ id:id }, process.env.JWT_SECRET, {
    //       expiresIn: process.env.JWT_EXPIRES_IN
    //     });
    //     console.log("El token es: " + token);
    //     const cookieOptions = {
    //       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    //       httpOnly: true
    //     }
    //     res.cookie('jwt', token, cookieOptions);
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
}

//Metodo para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM users';

    connectionDB.query(sql, (err, result) => {
      if (err) { console.log(err) };
      console.log(result);
      res.send(result)
    });
  } catch (error) {
    console.log(error);
  }
}