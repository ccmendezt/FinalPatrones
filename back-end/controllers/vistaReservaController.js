const connectionDB = require('../database/db');
const vistaReservaDAO = require('./DAO/vistaReservaDAO');
const vistaReservaDao = new vistaReservaDAO(connectionDB);

exports.getVistaReserva = async (req, res) => {
	try {
		const result = await vistaReservaDao.getVistaReservaDao();
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al obtener los registros" });
	}
}