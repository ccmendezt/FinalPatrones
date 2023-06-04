const connectionDB = require('../database/db');
const estadisticasDAO = require('./DAO/estadisticasDAO');
const estadisticasDao = new estadisticasDAO(connectionDB);

exports.getEstadisticas = async (req, res) => {
	try {
		const result = await estadisticasDao.getEstadisticasDao();
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al obtener los registros" });
	}
}