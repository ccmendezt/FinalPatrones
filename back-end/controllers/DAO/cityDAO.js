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

	// Otros métodos del DAO
}


module.exports = CityDAO;