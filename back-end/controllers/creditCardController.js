const creditcard = require('creditcard');
const identifyCard = require('credit-card-identifier')

exports.verifyCreditCard = (creditCardNumber) => {
  // Verificar la validez del número de tarjeta de crédito
  return creditcard.validate(creditCardNumber);
};

exports.identifyCreditCard = (creditCardNumber) => {
  // Identificar la tarjeta de crédito
  return identifyCard(creditCardNumber);
};

exports.cardRegister = async (req, res) => {
  try {
    const cardNumber = req.body.cardNumber;
      
    connectionDB.query("INSERT INTO usuario (nombre, apellido, usuario, email, password, idRol, idTarjeta) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, usuario, email, passHash, '3', idTarjeta], (err, result) => {
      if (err) { console.log(err); }
    })
    enviarCorreo.enviarEmail(nombre, apellido, email, usuario, passGenerate); //Envio de correo electronico a nuevo usuario
    res.send("Usuario registrado correctamente")
  }
  catch (error) { console.log(error); }
}


