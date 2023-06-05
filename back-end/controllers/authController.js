const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectionDB = require('../database/db');
const creditCardController = require('./creditCardController');
const axios = require('axios');
const userDAO = require('./DAO/userDAO');
const userDao = new userDAO(connectionDB);
const cardDAO = require('./DAO/creditCardDAO');
const cardDao = new cardDAO(connectionDB);

exports.register = async (req, res) => {
  const tokenCaptcha = req.body.tokenCaptcha;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_CAPTCHA}&response=${tokenCaptcha}`
  );
  if (response.data.success == false) {
    res.status(500).send("Captcha no verificado")
  } else {
    try {
      const user = req.body;
      if (user.email === "" || user.nombre === "" || user.apellido === "" || user.usuario === "" || user.cardNumber === "") {
        res.status(400).send({ error: "Completa todos los campos" })
      } else {
        const isCreditCardValid = creditCardController.verifyCreditCard(user.cardNumber);// verificar si la tarjeta de credito es valida
        if (!isCreditCardValid) {
          res.status(400).send({ error: 'El número de tarjeta de crédito no es válido' });
          return;
        } else {
          const identifierCard = creditCardController.identifyCreditCard(user.cardNumber);// identificar la tarjeta de credito
          console.log(identifierCard);
        }
        var idTarjeta = null;
        const responseCard = await cardDao.getIdCard(user.cardNumber);
        if (responseCard.length > 0) {
          idTarjeta = responseCard[0].idTarjeta;
        } else {
          console.log("No existe TC en la BD, se procede a insertar");
          const responseCard = await cardDao.insertCard(user.cardNumber);
          idTarjeta = responseCard;
        }
        const resRegisterUser = await userDao.createClient(user, idTarjeta);
        if (resRegisterUser.error) {
          res.status(500).send({ error: resRegisterUser.error });
          return;
        }
        res.send("Usuario registrado correctamente")
      }
    } catch (error) { return res.status(500).send({ error: "Error al registrar usuario" }); }
  }
}

//Metodo para logear un usuario
exports.login = async (req, res) => {
  try{
    const tokenCaptcha = req.body.tokenCaptcha;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_CAPTCHA}&response=${tokenCaptcha}`
    );
    if (response.data.success == false) {
      res.status(400).send("Captcha no verificado")
    } else {
      const credenciales = req.body;
      if (!credenciales.usuario || !credenciales.password) {
        return res.status(400).send({  mensaje: "Introduce un usuario y una contraseña" });
      }
      try {
        const resLogin = await userDao.getUserByUser(credenciales);
        const id = resLogin.idUsuario;
        const primerIngreso = resLogin.primerIngreso;
        if (resLogin) {
          if (!(await bcryptjs.compare(credenciales.password, resLogin.password))) {
            await userDao.updateLoginFailed(id);
            if (await userDao.getLoginFailed(id) >= 3) {
              await userDao.changePassword(id);
              return res.status(400).send({  mensaje: "Usuario bloqueado" });
            } else {
              return res.status(400).send({  mensaje: "Contraseña incorrecta" });
            }
          } else {
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRACION
            });
            const idRoleResponse = await userDao.getRoleUser(id);
            res.status(200).send({ message: 'Inicio de sesión exitoso', token, idRole: idRoleResponse, idUsuario: id, primerIngreso: primerIngreso });
          }
        }
      } catch (error) {
        return res.status(500).json({ mensaje: "Error usuario no existe" });
      }
    }
  }catch(error){
    console.log(error);
  }
}