const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const serialize = require('cookie');
const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
// const plantilla = fs.readFileSync('./templateRegister.ejs', 'utf-8'); // Carga y renderiza la plantilla de correo electrónico

//Metodo para registrar un usuario
exports.register = async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const usuario = req.body.usuario;
    const email = req.body.email;
    const cardNumber = req.body.cardNumber;
    const passGenerate = generarPassword();
    if (email === "" || nombre === "" || apellido === "" || usuario === "") {
      res.status(500).send({ error: "Completa todos los campos" })
    } else {
      let idTarjeta = null;
      if (cardNumber === "") {
        idTarjeta = null;
      }
      let passHash = await bcryptjs.hash(passGenerate, 8);
      connectionDB.query("INSERT INTO usuario (nombre, apellido, usuario, email, password, idRol, idTarjeta) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, usuario, email, passHash, '2', idTarjeta], (err, result) => {
        if (err) { console.log(err); }
      })
      enviarEmail(nombre, apellido, email, usuario, passGenerate);//Envio de correo
      res.send("Usuario registrado correctamente")
    }
  } catch (error) { console.log(error); }
}

//Metodo para logear un usuario
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sql = 'SELECT * FROM usuario WHERE email = ?';

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
            //res.cookie("jwt" , token, cookieOptions);)
            res.status(200).send({ message: 'Inicio de sesión exitoso', token });
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

function enviarEmail(nombre, apellido, email, usuario, password) {
  // Configuración del transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'parkudcolombia@gmail.com',
      pass: 'dmqgugraaponotaz'
    }
  });
  
  const datos = {
    nombre: nombre,
    apellido: apellido,
    usuario: usuario,
    password: password
  };

  console.log(datos);

  // const contenidoCorreo = ejs.render(plantilla, datos);

  // Definición del mensaje de correo con el contenido personalizado
  const mensajeCorreo = {
    from: 'parkudcolombia@gmail.com',
    to: email,
    subject: '¡Registro Exitoso! - ParkUD Colombia',
    text: 'Este es un mensaje de prueba enviado desde Node.js con sendmail.'
  };

  // Envío del correo electrónico
  transporter.sendMail(mensajeCorreo, function (error, info) {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}