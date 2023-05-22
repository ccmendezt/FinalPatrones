const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const serialize = require('cookie');
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
      connectionDB.query("INSERT INTO users (email, password, creditCard) VALUES (?, ?, ?)", [email, passHash, cardNumber], (err, result) => {
        if (err) {console.log(err);} else {res.send(result);}
      })
      res.send("Usuario registrado correctamente")
    }
  } catch (error) {console.log(error);}
}

//Metodo para logear un usuario
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sql = 'SELECT * FROM users WHERE email = ?';

    if (!email || !password) {
      return res.status(400).send({ error: "Introduce un email y una contraseña" });
    }

    connectionDB.query(sql, [email], async (err, results) => {
      if (err) {
        console.log(err);
      } else {
        if (results.length == 0) {
          return res.status(400).send({ error: "El usuario no existe" });
        } else {
          if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
            return res.status(400).send({ error: "Contraseña incorrecta" });
          } else {
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRACION
            });
            // const cookieOptions = {
            //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRACION * 24),
            //   httpOnly: true
            // }
            //console.log("El token es: " + token + " para el usuario " + email + " con id " + id + "");
            //res.cookie("jwt" , token, cookieOptions);
            res.status(200).send({ message: 'Inicio de sesión exitoso', token});
            //res.send('¡Cookie establecida!');
          }
        }
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
      res.send(result)
    });
  } catch (error) {
    console.log(error);
  }
}