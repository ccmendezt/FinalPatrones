const connectionDB = require('../database/db');
const userDAO = require('./DAO/userDAO');
const userDao = new userDAO(connectionDB);

exports.getUserRole = async (req, res) => {
	const idUsuario = req.body.id;
	const result = await userDao.getRoleUser(idUsuario);
	res.json(result);
}

exports.getAllUsers = async (req, res) => {
	const result = await userDao.getAllUsers();
	res.json(result);
}