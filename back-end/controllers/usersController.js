const connectionDB = require('../database/db');
exports.getUserRole = async (req, res) => {
	const idUsuario = req.body.id;
	connectionDB.query("SELECT idRol FROM usuario WHERE idUsuario = ?", [idUsuario], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
}