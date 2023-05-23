const creditcard = require('creditcard');
const identifyCard = require('credit-card-identifier')
const connectionDB = require('../database/db');

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
    connectionDB.query("INSERT INTO tarjetacredito (numeroTarjeta) VALUES (?)", [cardNumber], (err, result) => {
      if (err) { console.log(err); }
      res.status(200).send({ id: result.insertId });
    })
  }
  catch (error) { console.log(error); }
}

exports.getCardId = async (req, res) => {
  const cardNumber = req.params.cardnumber;
  try {
    connectionDB.query("SELECT idTarjeta FROM tarjetacredito WHERE numeroTarjeta = ?", [cardNumber], (err, result) => {
      if (err) { console.log(err); }
      else {
        res.send(result)
      }
    })
  }
  catch (error) { console.log(error); }
}

exports.getCards = async (req, res) => {
  try {
    connectionDB.query("SELECT * FROM tarjetacredito", (err, result) => {
      if (err) { console.log(err); }
      else {
        res.send(result)
      }
    })
  }
  catch (error) { console.log(error); }
}