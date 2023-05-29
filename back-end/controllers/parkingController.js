const connectionDB = require('../database/db');
const parkingDAO = require('./DAO/parkingDAO');
const parkingDao = new parkingDAO(connectionDB);

exports.createParking = async (req, res) => {
  const parking = req.body;
  const result = await parkingDao.createParkingDao(parking);
  res.json(result);
}

exports.getAllParking = async (req, res) => {
  const result = await parkingDao.getAllParkingDao();
  res.json(result);
  // try {
  //   const result = await parkingDao.getAllParkingDao();
  //   res.json({ result });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Error al obtener los datos de los parqueaderos' });
  // }
}

exports.getParkingById = async (req, res) => {
  const id = req.params.id;
  const result = await parkingDao.getParkingByIdDao(id);
  res.json(result);
}

exports.getParkingByCity = async (req, res) => {
  const id = req.params.idcity;
  const result = await parkingDao.getParkingByCityDao(id);
  res.json(result);
}

exports.updateParking = async (req, res) => {
  const parking = req.body;
  const result = await parkingDao.updateParkingDao(parking);
  res.json(result);
}

exports.deleteParking = async (req, res) => {
  const id = req.params.id;
  const result = await parkingDao.deleteParkingDao(id);
  res.json(result);
}