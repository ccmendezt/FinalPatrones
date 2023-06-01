const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const cardController = require('../controllers/creditCardController')
const userController = require('../controllers/userController')
const connectionDB = require('../database/db');
const jwtController = require('../controllers/jwtController');
const parkingController = require('../controllers/parkingController');
const cityController = require('../controllers/cityController');
const reservController = require('../controllers/reservController');

router.get('/', (req, res) => {
  connectionDB
  res.render('index.ejs')
})

//Rutas para validar token JWT
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
router.get("/card/id/:id", cardController.getCardById); //Obtener una tarjeta de credito por id
router.get("/card/", cardController.getCards); //Listar todas las tarjetas de credito

//Rutas para los metodos del controlador de usuarios
router.post("/users/role", userController.getUserRole); //Obtener el rol de un usuario
router.post("/users/createAdmin", userController.createAdmin); //Crear un usuario
router.get("/users/", userController.getAllUsers); //Listar todos los usuarios
router.get("/users/:id", userController.getUserById); //Obtener un usuario por id
router.put("/users/update/:id", userController.updateUserAdmin); //Actualizar un usuario
router.delete("/users/delete/:id", userController.deleteUser); //Eliminar un usuario


//Rutas para el controlador de parqueaderos
router.post("/parking/create", parkingController.createParking); //Crear un parqueadero
router.get("/parking/", parkingController.getAllParking); //Listar todos los parqueaderos
router.get("/parking/:id", parkingController.getParkingById); //Obtener un parqueadero por id
router.get("/parking/city/:idcity", parkingController.getParkingByCity); //Obtener un parqueadero por id
router.put("/parking/update", parkingController.updateParking); //Actualizar un parqueadero
router.delete("/parking/delete/:id", parkingController.deleteParking); //Eliminar un parqueadero

//Rutas para el controlador de reservas
router.post("/reserv/create", reservController.createReserv); //Crear una reserva
router.get("/reserv/", reservController.getAllReserv); //Listar todas las reservas
router.get("/reserv/:id", reservController.getReservById); //Obtener una reserva por id
router.get("/reserv/user/:iduser", reservController.getReservByUser); //Obtener una reserva por id
router.get("/reserv/parking/:idparking", reservController.getReservByParking); //Obtener una reserva por id
router.put("/reserv/update", reservController.updateReserv); //Actualizar una reserva
router.delete("/reserv/delete/:id", reservController.deleteReserv); //Eliminar una reserva

//Rutas para el controlador de ciudades
router.get("/city/", cityController.getAllCities); //Listar todas las ciudades

module.exports = router