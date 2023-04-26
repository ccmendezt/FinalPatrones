const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const connectionDB = require('../database/db')

router.get('/', (req, res) => {
    connectionDB()
    res.render('index.ejs')
})


//Router para authController
router.get("/users/", (req, res) => {   //Obtener todos los usuarios
  connectionDB.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

//Obtener un usuario por su username
router.get("/users/:username", (req, res) => {
  const username = req.params.username;
  connectionDB.query("SELECT * FROM users WHERE user = ?", username, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
});

module.exports = router