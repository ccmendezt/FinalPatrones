const connectionDB = require('../database/db');
const parkingDAO = require('./DAO/parkingDAO');
const parkingDao = new parkingDAO(connectionDB);

exports.createParking = async (req, res) => {
  const parking = req.body;
  try {
    const result = await parkingDao.createParkingDao(parking);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear el parqueadero" });
  }
}

exports.getAllParking = async (req, res) => {
  try {
    const result = await parkingDao.getAllParkingDao();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener los parqueaderos" });
  }
}

exports.getParkingById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await parkingDao.getParkingByIdDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: `Error al obtener el parqueadero con id ${id}` });
  }
}

exports.getParkingByCity = async (req, res) => {
  const id = req.params.idcity;
  try {
    const result = await parkingDao.getParkingByCityDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: `Error al obtener los parqueaderos con id de ciudad ${id}` });
  }
  
}

exports.updateParking = async (req, res) => {
  const parking = req.body;
  try {
    const result = await parkingDao.updateParkingDao(parking);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al actualizar el parqueadero" });
  }
}

exports.deleteParking = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await parkingDao.deleteParkingDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: `Error al eliminar el parqueadero con id ${id}` });
  }
}