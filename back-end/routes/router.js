const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const cardController = require('../controllers/creditCardController')
const connectionDB = require('../database/db');

router.get('/', (req, res) => {
  connectionDB
  res.render('index.ejs')
})

//Rutas para las vistas
router.get("/users/", authController.getAllUsers); //Obtener todos los usuarios

//Rutas para los metodos del controlador Auth
router.post("/users/register", authController.register); //Registrar un usuario
router.post("/users/login", authController.login); //Logear un usuario

//Rutas para los metodos del controlador de tarjetas de credito
router.post("/card/", cardController.cardRegister); //Crear una tarjeta de credito
router.get("/card/:cardnumber", cardController.getCardId); //Obtener id de tarjeta de credito
router.get("/card/", cardController.getCards); //Listar todas las tarjetas de credito


module.exports = router