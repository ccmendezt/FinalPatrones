class VistaReservaDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

    async getVistaReservaDao() {
		const sql = 'SELECT * FROM `vista_reserva`';
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

module.exports = VistaReservaDAO;