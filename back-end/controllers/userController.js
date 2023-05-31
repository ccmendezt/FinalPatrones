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

exports.createAdmin = async (req, res) => {
	const user = req.body;
	const result = await userDao.createAdmin(user);
	res.json(result);
}

exports.updateUserAdmin = async (req, res) => {
	const user = req.body;
	const idUser = req.params.id;
	const result = await userDao.updateUserAdmin(user, idUser);
	res.json(result);
}

exports.deleteUser = async (req, res) => {
	const idUser = req.params.id;
	const result = await userDao.deleteUser(idUser);
	res.json(result);
}