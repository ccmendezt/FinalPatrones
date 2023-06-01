const connectionDB = require('../database/db');
const cityDAO = require('./DAO/cityDAO');
const cityDao = new cityDAO(connectionDB);

exports.getAllCities = async (req, res) => {
	const result = await cityDao.getAllCitiesDao();
	res.json(result);
}