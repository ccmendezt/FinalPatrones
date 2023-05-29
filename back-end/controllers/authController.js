const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const crypto = require('crypto');
const enviarCorreo = require('../templates/enviarCorreo')
const creditCardController = require('./creditCardController');
const axios = require('axios');
const apiUrl = process.env.API_URL;

exports.register = async (req, res) => {
  const tokenCaptcha = req.body.tokenCaptcha;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_CAPTCHA}&response=${tokenCaptcha}`
  );
  if (response.data.success == false) {
    res.status(400).send("Captcha no verificado")
  } else {
    try {
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

        /////////////////////////////////////////////////////////

        var idTarjeta = null;
        try {
          idTarjeta = null;
          const response = await axios.get(`${apiUrl}/card/${cardNumber}`);
          if (response.data[0]) {
            // El número de tarjeta ya existe en la base de datos
            idTarjeta = response.data[0].idTarjeta;
            console.log(`El número de tarjeta ya existe y es ${idTarjeta}`);
          } else {
            try {
              const response = await axios.post(`${apiUrl}/card`, { cardNumber });
              idTarjeta = response.data
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }

        ///////////////////////////////////////////

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
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_CAPTCHA}&response=${tokenCaptcha}`
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
              const id = results[0].idUsuario;
              const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_TIEMPO_EXPIRACION
              });
              const idRoleResponse = await axios.post(`${apiUrl}/users/role`, { id });
              res.status(200).send({ message: 'Inicio de sesión exitoso', token, idRole: idRoleResponse.data.idRol });
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
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