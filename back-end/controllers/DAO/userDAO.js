const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const enviarCorreo = require('../../templates/enviarCorreo')
class UserDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

	async getAllUsers() {
		const sql = 'SELECT * FROM `usuario`';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontraron usuarios');
					}
					resolve(result);
				}
			});
		});
	}

	async createClient(user, tarjeta) {
		const { nombre,
			apellido,
			usuario,
			email } = user;
		const password = generarPassword();
		const idTarjeta = tarjeta;
		let passHash = await bcryptjs.hash(password, 8);
		const sql = 'INSERT INTO usuario (nombre, apellido, usuario, email, password, idRol, idTarjeta, intentoIngreso, primerIngreso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, apellido, usuario, email, passHash, '3', idTarjeta, '0', 1], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.affectedRows > 0) {
						enviarCorreo.enviarEmail(nombre, apellido, email, usuario, password, 'cliente'); //Envio de correo electronico a nuevo usuario
						resolve(result.insertId);
					} else {
						reject('Error al crear usuario');
					}
				}
			});
		});
	}

	async getUserById(idUser) {
		const sql = 'SELECT * FROM usuario WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.length == 0) {
						reject('No se encontro el usuario');
					}
					resolve(result[0]);
				}
			});
		});
	}

	async getUserByUser(user) {
		const sql = 'SELECT * FROM usuario WHERE usuario = ?';
		const usuario = user.usuario;
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [usuario], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.length == 0) {
						reject('No se encontro el usuario');
					}
					resolve(result[0]);
				}});
		});
	}

	async getRoleUser(idUser) {
		const sql = 'SELECT idRol FROM usuario WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					// if(result[0].)
					resolve(result[0].idRol);
				}
			});
		});
	}

	async createAdmin(user) {
		const { nombre,
			apellido,
			usuario,
			email } = user;
		const password = generarPassword();
		let passHash = await bcryptjs.hash(password, 8);
		const sql = 'INSERT INTO usuario (nombre, apellido, usuario, email, password, idRol) VALUES (?, ?, ?, ?, ?, ?)';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, apellido, usuario, email, passHash, '1'], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.affectedRows > 0) {
						enviarCorreo.enviarEmail(nombre, apellido, email, usuario, password, 'admin');
					}
					resolve(result);
				}
			});
		});
	}

	async updateUserAdmin(user) {
		const { nombre,
			apellido,
			usuario,
			email,
			password,
			idUser } = user;
		
		let passHash = await bcryptjs.hash(password, 8);
		const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, usuario = ?, email = ?, password = ? WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, apellido, usuario, email, passHash, idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.affectedRows > 0) {
						enviarCorreo.enviarEmail(nombre, apellido, email, usuario, password, 'updateDatosCuenta'); //Envio de correo electronico
						resolve(result.insertId);
					} else {
						reject('Error al actualizar usuario');
					}
				}
			});
		});
	}


	async updateUserClient(user, idTarjeta) {
		const { nombre,
			apellido,
			usuario,
			email,
			password,
			primerIngreso,
			idUser } = user;
		
		let passHash = await bcryptjs.hash(password, 8);
		const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, usuario = ?, email = ?, password = ?, idTarjeta  = ?, primerIngreso = ? WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, apellido, usuario, email, passHash, idTarjeta, primerIngreso, idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.affectedRows > 0) {
						enviarCorreo.enviarEmail(nombre, apellido, email, usuario, password, 'updateDatosCuenta'); //Envio de correo electronico
						resolve(result.insertId);
					} else {
						reject('Error al actualizar usuario');
					}
				}
			});
		});
	}


	async updateLoginFailed (idUser) {
		const sql = 'UPDATE usuario SET intentoIngreso = intentoIngreso + 1 WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result);
				}});
		});
	}

	async getLoginFailed (idUser) {
		const sql = 'SELECT intentoIngreso FROM usuario WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result[0].length == 0) {
						reject('Usuario no encontrado');
					}
					resolve(result[0].intentoIngreso);
				}});
		});
	}

	async changePassword (idUser) {
		const password = generarPassword();
		let passHash = await bcryptjs.hash(password, 8);
		const sql = 'UPDATE usuario SET password = ?, intentoIngreso = 0, primerIngreso = 1 WHERE idUsuario = ?';
		const emailUser = await this.getUserById(idUser);
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [passHash, idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if(result.affectedRows > 0) {
						enviarCorreo.enviarEmail(emailUser.nombre, emailUser.apellido, emailUser.email, emailUser.usuario, password, 'cambioPass');
						resolve('Contraseña cambiada correctamente');
					} else {
						reject('Error al cambiar contraseña');
					}
				}
			});
		});
	}


	async deleteUser(idUser) {
		const sql = 'DELETE FROM usuario WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
}

function generarPassword() {
	const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const longitud = 8;
	let password = '';
	while (password.length < longitud || !contieneRequisitos(password)) {
		password = '';
		for (let i = 0; i < longitud; i++) {
			const indice = crypto.randomInt(0, caracteres.length);
			password += caracteres[indice];
		}
	}
	return password;
}

function contieneRequisitos(password) {
	return /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password);
}

module.exports = UserDAO;