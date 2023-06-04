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
  try {
    const result = await cardDao.insertCard(cardNumber);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al registrar la tarjeta" });
  }
}

exports.getCardId = async (req, res) => {
  const cardNumber = req.params.cardnumber;
  try {
    const result = await cardDao.getIdCard(cardNumber);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener el id de la tarjeta" });
  }
}

exports.getCardById = async (req, res) => {
  const idCard = req.params.id;
  try {
    const result = await cardDao.getCardById(idCard);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: `Error al obtener la tarjeta con id ${idCard}` });
  }
}

exports.getCards = async (req, res) => {
  try {
    const result = await cardDao.getAllCards();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener las tarjetas" });
  }
}