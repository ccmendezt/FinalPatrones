class CityDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

	async getAllCitiesDao() {
		const sql = 'SELECT * FROM `ciudad`';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontraron ciudades');
					}
					resolve(result);
				}
			});
		});
	}

	async getCityById(id) {
		const sql = 'SELECT * FROM `ciudad` WHERE idCiudad = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [id], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontro la ciudad');
					}
					resolve(result[0]);
				}
			});
		});
	}

	async createCity(city) {
		const sql = 'INSERT INTO `ciudad` SET ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, city, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se pudo crear la ciudad');
					}
					resolve(result);
				}
			});
		});
	}

	async updateCity(id, city) {
		const sql = 'UPDATE `ciudad` SET ? WHERE idCiudad = ?';
		try {
			return new Promise((resolve, reject) => {
				this.dbConnection.query(sql, [city, id], (err, result) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(result);
					}
				});
			});	
		} catch (error) {
			return res.status(500).json({error: "Error al actualizar la ciudad"});
		}
	}
}


module.exports = CityDAO;