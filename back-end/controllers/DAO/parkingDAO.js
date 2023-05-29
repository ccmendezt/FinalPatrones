class ParkingDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

	async createParkingDao(parking) {
		const { nombre,
			ciudad,
			direccion,
			cupo,
			tarifa,
			cobertura } = parking;
		const sql = 'INSERT INTO `parqueadero` (`nombreParqueadero`, `direccion`, `tarifa`, `cuposTotales`, `cuposDisp`, `cuposUtilizados`, `idCiudad`, `idTipoParqueadero`, `idHorParqInicio`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, direccion, tarifa, cupo, cupo, '0', ciudad, cobertura, '1'], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					// console.log(result);
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
					// console.log(result);
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
					// console.log(result);
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
					// console.log(result);
					resolve(result);
				}
			});
		});
	}

	async updateParkingDao(parking) {
		const { nombre,
			direccion,
			tarifa,
			cupo,
			cobertura,
			idParqueadero } = parking;
		const sql = 'UPDATE `parqueadero` SET `nombreParqueadero` = ?, `direccion` = ?, `tarifa` = ?, `cuposTotales` = ?, `idTipoParqueadero` = ? WHERE `parqueadero`.`idParqueadero` = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [nombre, direccion, tarifa, cupo, cobertura, idParqueadero], (err, result) => {
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