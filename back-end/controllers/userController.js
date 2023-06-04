const connectionDB = require('../database/db');
const userDAO = require('./DAO/userDAO');
const userDao = new userDAO(connectionDB);
const cardDAO = require('./DAO/creditCardDAO');
const cardDao = new cardDAO(connectionDB);
const creditCardController = require('./creditCardController');

exports.getAllUsers = async (req, res) => {
	try {
		const result = await userDao.getAllUsers();
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al obtener los usuarios" });
	}
}

exports.getUserById = async (req, res) => {
	const idUser = req.params.id;
	try {
		const result = await userDao.getUserById(idUser);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: `Error al obtener el usuario con id ${idUser}` });
	}
}

exports.registerClient = async (req, res) => {
	const user = req.body;
	const numTarjeta = user.tarjeta;
	try {
		const result = await userDao.createClient(user, tarjeta);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al crear el usuario" });
	}
}

exports.createAdmin = async (req, res) => {
	const user = req.body;
	try {
		const result = await userDao.createAdmin(user);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: "Error al crear el usuario" });
	}
}

exports.updateUserAdmin = async (req, res) => {
	try {
		const user = req.body;
		if (user.email === "" || user.nombre === "" || user.apellido === "" || user.usuario === "" || user.password === "") {
			res.status(500).send({ error: "Completa todos los campos" })
		} else {
			const result = await userDao.updateUserAdmin(user);
			if (result.error) {
				res.status(400).send({ error: result.error });
				return;
			}
			res.json(result);
		}
	} catch (error) {
		console.log(error);
	}
}

exports.updateUserClient = async (req, res) => {
	try {
		const user = req.body;
		if (user.email === "" || user.nombre === "" || user.apellido === "" || user.usuario === "" || user.card === "" || user.password === "") {
			res.status(500).send({ error: "Completa todos los campos" })
		} else {
			const isCreditCardValid = creditCardController.verifyCreditCard(user.card);// verificar si la tarjeta de credito es valida
			if (!isCreditCardValid) {
				res.status(400).send({ error: 'El número de tarjeta de crédito no es válido' });
				return;
			} else {
				const identifierCard = creditCardController.identifyCreditCard(user.card);// identificar la tarjeta de credito
				console.log(identifierCard);
			}
			var idTarjeta = null;
			const responseCard = await cardDao.getIdCard(user.card);
			if (responseCard.length > 0) {
				idTarjeta = responseCard[0].idTarjeta;
			} else {
				console.log("No existe TC en la BD, se procede a insertar");
				const responseCard = await cardDao.insertCard(user.card);
				idTarjeta = responseCard;
			}
			const result = await userDao.updateUserClient(user, idTarjeta);
			if (result.error) {
				res.status(400).send({ error: result.error });
				return;
			}
			res.json(result);
		}
	} catch (error) {
		console.log(error);
	}
}

exports.deleteUser = async (req, res) => {
	const idUser = req.params.id;
	try {
		const result = await userDao.deleteUser(idUser);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ mensaje: `Error al eliminar el usuario con id ${idUser}` });
	}
}