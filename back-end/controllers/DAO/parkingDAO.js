class ParkingDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

	async createParkingDao(parking) {
		const { nombre,
			ciudad,
			direccion,
			cupo,
			cobertura } = parking;
		const sql = 'INSERT INTO `parqueadero` (`nombreParqueadero`, `direccion`, `tarifaCarro`, `tarifaMoto`, `tarifaBici`, `cuposTotales`, `cuposDisp`, `cuposUtilizados`, `idCiudad`, `idTipoParqueadero`, `idHorParqInicio`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, direccion, '90', '35', '5', cupo, cupo, '0', ciudad, cobertura, '1'], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result.insertId);
				}
			});
		});
	}

	async getAllParkingDao() {
		const sql = 'SELECT * FROM `parqueadero`';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontraron parqueaderos');
					}
					resolve(result);
				}
			});
		});
	}

	async getParkingByIdDao(idParking) {
		const sql = 'SELECT * FROM `parqueadero` WHERE idParqueadero = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idParking], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontro el parqueadero');
					}
					resolve(result[0]);
				}
			});
		});
	}

	async getParkingByCityDao(idCity) {
		const sql = 'SELECT * FROM `parqueadero` WHERE idCiudad = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idCity], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontraron parqueaderos en la ciudad especificada');
					}
					resolve(result);
				}
			});
		});
	}

	async updateParkingDao(parking) {
		const { nombreParqueadero,
			direccion,
			tarifaCarro,
			tarifaMoto,
			tarifaBici,
			cobertura,
			idParqueadero } = parking;
		console.log(cobertura)
		const sql = 'UPDATE parqueadero SET nombreParqueadero = ?, direccion = ?, tarifaCarro = ?, tarifaMoto = ?, tarifaBici = ?, idTipoParqueadero = ? WHERE idParqueadero = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombreParqueadero, direccion, tarifaCarro, tarifaMoto, tarifaBici, cobertura, idParqueadero], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	async deleteParkingDao(idParking) {
		const sql = 'DELETE FROM `parqueadero` WHERE `parqueadero`.`idParqueadero` = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idParking], (err, result) => {
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


module.exports = ParkingDAO;