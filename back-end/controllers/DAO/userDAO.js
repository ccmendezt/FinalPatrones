class UserDAO{
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
					// console.log(result);
					resolve(result);
				}
			});
		});
	}

	getRoleUser(idUser) {
		const sql = 'SELECT idRol FROM usuario WHERE idUsuario = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idUser], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
	}
}

module.exports = UserDAO;