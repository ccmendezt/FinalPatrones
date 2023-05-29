const connectionDB = require('../database/db');
const cityDAO = require('./DAO/cityDAO');
const cityDao = new cityDAO(connectionDB);

exports.getAllCities = async (req, res) => {
	const result = await cityDao.getAllCitiesDao();
	res.json(result);
	// try {
	// 	const result = await cityDao.getAllCitiesDao();
	// 	res.json(result);
	// } catch (error) {
	// 	console.error(error);
	// 	res.status(500).json({ error: 'Error al obtener los datos de las ciudades' });
	// }
}