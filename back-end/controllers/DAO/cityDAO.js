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
					// console.log(result);
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
					// console.log(result);
					resolve(result);
				}
			});
		});
	}
}


module.exports = CityDAO;