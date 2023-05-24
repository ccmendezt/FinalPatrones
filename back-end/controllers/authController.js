const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const serialize = require('cookie');
const { promisify } = require('util');
const crypto = require('crypto');
const enviarCorreo = require('../templates/enviarCorreo')
const creditCardController = require('./creditCardController');
const axios = require('axios');
const { Console } = require('console');

exports.register = async (req, res) => {
  const tokenCaptcha = req.body.tokenCaptcha;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${tokenCaptcha}`
  );
  if (response.data.success == false) {
    res.status(400).send("Captcha no verificado")
  } else {
    try {
      const apiUrl = process.env.API_URL;
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const usuario = req.body.usuario;
      const email = req.body.email;
      const cardNumber = req.body.cardNumber;
      const passGenerate = generarPassword();
      if (email === "" || nombre === "" || apellido === "" || usuario === "" || cardNumber === "") {
        res.status(500).send({ error: "Completa todos los campos" })
      } else {
        const isCreditCardValid = creditCardController.verifyCreditCard(cardNumber);// vrificar si la tarjeta de credito es valida
        if (!isCreditCardValid) {
          res.status(400).send({ error: 'El número de tarjeta de crédito no es válido' });
          return;
        } else {
          const identifierCard = creditCardController.identifyCreditCard(cardNumber);// identificar la tarjeta de credito
          console.log(identifierCard);
        }
        // metodo get de axios para obtener id tarjeta de credito
        axios.get(`${apiUrl}/card/${cardNumber}`)
          .then(response => {
            console.log(response.data);
          }).catch(error => {
            console.error(error);
          });
        var idTarjeta = null;
        axios.post(`${apiUrl}/card`, { cardNumber })
          .then(response => {
            console.log(response.data);
            idTarjeta = response.data.id;
          }).catch(error => {
            console.error(error);
          });
        connectionDB.query("SELECT idTarjeta FROM tarjetacredito WHERE numeroTarjeta = ?", [cardNumber], (err, result) => {
          if (err) { console.log(err); }
          else {
            console.log(result);
          }
        })
        // console.log(idTarjeta);

        let passHash = await bcryptjs.hash(passGenerate, 8);

        connectionDB.query("INSERT INTO usuario (nombre, apellido, usuario, email, password, idRol, idTarjeta) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, usuario, email, passHash, '3', idTarjeta], (err, result) => {
          if (err) { console.log(err); }
        })
        enviarCorreo.enviarEmail(nombre, apellido, email, usuario, passGenerate); //Envio de correo electronico a nuevo usuario
        res.send("Usuario registrado correctamente")
      }
    } catch (error) { console.log(error); }
  }
}


//Metodo para logear un usuario
exports.login = async (req, res) => {
  const tokenCaptcha = req.body.tokenCaptcha;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${tokenCaptcha}`
  );
  if (response.data.success == false) {
    res.status(400).send("Captcha no verificado")
  } else {
    // res.send("Captcha verificado")
    try {
      const usuario = req.body.usuario;
      const password = req.body.password;
      const sql = 'SELECT * FROM usuario WHERE usuario = ?';

      if (!usuario || !password) {
        return res.status(400).send({ error: "Introduce un usuario y una contraseña" });
      }

      connectionDB.query(sql, [usuario], async (err, results) => {
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
              //res.cookie("jwt" , token, cookieOptions);)
              res.status(200).send({ message: 'Inicio de sesión exitoso', token });
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
    }

  }
  if (1 === 1) {

  } else {
    res.status(400).send({ error: "Error en el captcha" });
  }

}

//Metodo para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM usuario';
    connectionDB.query(sql, (err, result) => {
      if (err) { console.log(err) };
      res.send(result)
    });
  } catch (error) {
    console.log(error);
  }
}

function generarPassword() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const longitud = 8;
  let password = '';
  while (password.length < longitud || !contieneRequisitos(password)) {
    password = '';
    for (let i = 0; i < longitud; i++) {
      const indice = crypto.randomInt(0, caracteres.length);
      password += caracteres[indice];
    }
  }
  return password;
}

function contieneRequisitos(password) {
  return /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password);
}