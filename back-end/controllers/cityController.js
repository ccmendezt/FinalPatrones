const connectionDB = require('../database/db');
const cityDAO = require('./DAO/cityDAO');
const cityDao = new cityDAO(connectionDB);

exports.getAllCities = async (req, res) => {
	try {
		const result = await cityDao.getAllCitiesDao();
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al obtener las ciudades" });
	}
}

exports.getCityById = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await cityDao.getCityById(id);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: `Error al obtener la ciudad con id ${id}` });
	}

}

exports.createCity = async (req, res) => {
	const city = req.body;
	try {
		const result = await cityDao.createCity(city);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al crear la ciudad" });
	}

}

exports.updateCity = async (req, res) => {
	const { id } = req.params;
	const city = req.body;
	try {
		const result = await cityDao.updateCity(id, city);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al actualizar la ciudad" });
	}

}