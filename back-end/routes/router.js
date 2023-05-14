const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const connectionDB = require('../database/db');

router.get('/', (req, res) => {
  connectionDB
  res.render('index.ejs')
})

//Rutas para las vistas

router.get("/users/", authController.getAllUsers); //Obtener todos los usuarios

//Rutas para los metodos del controlador

router.post("/users/register", authController.register); //Registrar un usuario
router.post("/users/login", authController.login); //Logear un usuario


module.exports = router