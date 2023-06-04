const connectionDB = require('../database/db');
const cityDAO = require('./DAO/cityDAO');
const cityDao = new cityDAO(connectionDB);

exports.getAllCities = async (req, res) => {
	const result = await cityDao.getAllCitiesDao();
	res.json(result);
}

exports.getCityById = async (req, res) => {
	const { id } = req.params;
	const result = await cityDao.getCityById(id);
	res.json(result);
}