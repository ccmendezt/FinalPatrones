class EstadisticasDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

    async getEstadisticasDao() {
		const sql = 'SELECT * FROM `vista_estadisticas`';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontraron registros');
					}
					resolve(result);
				}
			});
		});
	}
}

module.exports = EstadisticasDAO;