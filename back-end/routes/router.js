const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const cardController = require('../controllers/creditCardController')
const usersController = require('../controllers/usersController')
const connectionDB = require('../database/db');
const jwtController = require('../controllers/jwtController');

router.get('/', (req, res) => {
  connectionDB
  res.render('index.ejs')
})

//Rutas para las vistas
router.get("/users/", authController.getAllUsers); //Obtener todos los usuarios
router.get("/jwt/", jwtController.validarToken, (req, res) => {
  // El token es válido, puedes acceder a los datos del usuario decodificados
  // Enviar una respuesta al cliente
  res.json({ mensaje: 'Acceso autorizado JWT Válido', statusToken: true });
});

//Rutas para los metodos del controlador Auth
router.post("/users/register", authController.register); //Registrar un usuario
router.post("/users/login", authController.login); //Logear un usuario

//Rutas para los metodos del controlador de tarjetas de credito
router.post("/card/", cardController.cardRegister); //Crear una tarjeta de credito
router.get("/card/:cardnumber", cardController.getCardId); //Obtener id de tarjeta de credito
router.get("/card/", cardController.getCards); //Listar todas las tarjetas de credito

//Rutas para los metodos del controlador de usuarios
router.post("/users/role", usersController.getUserRole); //Obtener el rol de un usuario


module.exports = router