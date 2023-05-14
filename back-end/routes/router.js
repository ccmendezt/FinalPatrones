const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const connectionDB = require('../database/db')

router.get('/', (req, res) => {
  connectionDB()
  res.render('index.ejs')
})

//Rutas para las vistas

// router.get("/users/", (req, res) => {   //Obtener todos los usuarios
//   connectionDB.query("SELECT * FROM users", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

router.get("/users/", authController.getAllUsers); //Obtener todos los usuarios

//Rutas para los metodos del controlador

router.post("/users/register", authController.register);


//Obtener un usuario por su email
router.post("/users/login", (req, res) => {
  const email = req.params.email;
  const password = req.body.password;
  //Query para obtener un usuario por su email y contraseña
  connectionDB.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  }
  )
});

module.exports = router