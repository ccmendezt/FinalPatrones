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
      console.log("Las contraseñas no coinciden");
      res.status(500).send({ error: "Las contraseñas no coinciden" })
    } else {
      let passHash = await bcryptjs.hash(password, 8);
      //console.log(passHash);
      connectionDB.query("INSERT INTO users (email, password, creditCard) VALUES (?, ?, ?)", [email, passHash, cardNumber], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
        //res.status(200).json({ data: result });
        // console.log(result);
      })
      res.send("Usuario registrado correctamente")
    }
  } catch (error) {
    console.log(error);
  }
}

//Metodo para logear un usuario
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //const sql = 'SELECT * FROM users WHERE email = ?';

    console.log(email);
    console.log(password);

    if (!email || !password) {
      return res.status(400).send({ error: "Introduce un email y una contraseña" });
    }

    connectionDB.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        if (results.length == 0) {
          return res.status(400).send({ error: "El usuario no existe" });
        }
        // } else {
        //   if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
        //     return res.status(400).send({ error: "Contraseña incorrecta" });
        //   } else {
        //     const id = results[0].id;
        //     const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        //       expiresIn: process.env.JWT_TIEMPO_EXPIRACION
        //     });
        //     console.log("El token es: " + token + " para el usuario " + email + " con id " + id + "");
        //     const cookieOptions = {
        //       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRACION * 24 * 60 * 60 * 1000),
        //       httpOnly: true
        //     }
        //     res.cookie('jwt', token, cookieOptions);
        //     res.status(200).send({ token });
        //   }
        // }
      }
    })
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