const connectionDB = require('../database/db');
const reservDAO = require('./DAO/reservDAO');
const reservDao = new reservDAO(connectionDB);

exports.createReserv = async (req, res) => {
  const reserv = req.body;
  const result = await reservDao.createReservDao(reserv);
  res.json(result);
}

exports.getAllReserv = async (req, res) => {
  const result = await reservDao.getAllReservDao();
  res.json(result);
}

exports.getReservById = async (req, res) => {
  const id = req.params.id;
  const result = await reservDao.getReservByIdDao(id);
  res.json(result);
}

exports.getReservByUser = async (req, res) => {
  const id = req.params.iduser;
  const result = await reservDao.getReservByUserDao(id);
  res.json(result);
}

exports.getReservByParking = async (req, res) => {
  const id = req.params.idparking;
  const result = await reservDao.getReservByParkingDao(id);
  res.json(result);
}

exports.updateReserv = async (req, res) => {
  const reserv = req.body;
  const result = await reservDao.updateReservDao(reserv);
  res.json(result);
}

exports.deleteReserv = async (req, res) => {
  const id = req.params.id;
  const result = await reservDao.deleteReservDao(id);
  res.json(result);
}

