const creditcard = require('creditcard');
const identifyCard = require('credit-card-identifier')
const connectionDB = require('../database/db');
const cardDAO = require('./DAO/creditCardDAO');
const cardDao = new cardDAO(connectionDB);

exports.verifyCreditCard = (creditCardNumber) => {
  // Verificar la validez del número de tarjeta de crédito
  return creditcard.validate(creditCardNumber);
};

exports.identifyCreditCard = (creditCardNumber) => {
  // Identificar la tarjeta de crédito
  return identifyCard(creditCardNumber);
};

exports.cardRegister = async (req, res) => {
  const cardNumber = req.body.cardNumber;
  const result = await cardDao.insertCard(cardNumber);
  console.log(result);
  res.json(result);
  // try {
  //   connectionDB.query("INSERT INTO tarjetacredito (numeroTarjeta) VALUES (?)", [cardNumber], (err, result) => {
  //     if (err) { console.log(err); }
  //     res.status(200).send({ id: result.insertId });
  //   })
  // }
  // catch (error) { console.log(error); }
}

exports.getCardId = async (req, res) => {
  const cardNumber = req.params.cardnumber;
  const result = await cardDao.getIdCard(cardNumber);
  console.log(result);
  res.json(result);
  // try {
  //   connectionDB.query("SELECT idTarjeta FROM tarjetacredito WHERE numeroTarjeta = ?", [cardNumber], (err, result) => {
  //     if (err) { console.log(err); }
  //     else {
  //       res.send(result)
  //     }
  //   })
  // }
  // catch (error) { console.log(error); }
}

exports.getCards = async (req, res) => {
  const result = await cardDao.getAllCards();
  res.json(result);
  // try {
  //   const result = await cardDao.getAllCards();
  //   res.json({ result });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Error al obtener los datos de las tarjetas' });
  // }
}