const connectionDB = require('../database/db');
const reservDAO = require('./DAO/reservDAO');
const reservDao = new reservDAO(connectionDB);

exports.createReserv = async (req, res) => {
  const reserv = req.body;
  try {
    const result = await reservDao.createReservDao(reserv);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
}

exports.getAllReserv = async (req, res) => {
  try {
    const result = await reservDao.getAllReservDao();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener las reservas" });
  }
}

exports.getReservById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await reservDao.getReservByIdDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener la reserva" });
  }
}

exports.getReservByUser = async (req, res) => {
  try {
    const id = req.params.iduser;
    const result = await reservDao.getReservByUserDao(id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }


}

exports.getReservByParking = async (req, res) => {
  const id = req.params.idparking;
  try {
    const result = await reservDao.getReservByParkingDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener las reservas" });
  }
}

exports.updateReserv = async (req, res) => {
  try {
    const reserv = req.body;
    const result = await reservDao.updateReservDao(reserv);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}

exports.deleteReserv = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await reservDao.deleteReservDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al eliminar la reserva" });
  }
}

