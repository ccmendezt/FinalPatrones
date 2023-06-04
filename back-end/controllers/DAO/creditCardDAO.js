class CreditCardDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

	async insertCard(card) {
		const sql = 'INSERT INTO tarjetacredito (numeroTarjeta) VALUES (?)';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [card], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result.insertId);
				}
			});
		});
	}

	async getAllCards() {
		const sql = 'SELECT * FROM `tarjetacredito`';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontraron tarjetas');
					}
					resolve(result);
				}
			});
		});
	}

	async getCardById(idCard) {
		const sql = 'SELECT numeroTarjeta FROM tarjetacredito WHERE idTarjeta = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [idCard], (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (result.length == 0) {
						reject('No se encontro la tarjeta');
					}
					resolve(result[0]);
				}});
		});
	}

	async getIdCard(cardNumber) {
		const sql = 'SELECT idTarjeta FROM tarjetacredito WHERE numeroTarjeta = ?';
		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, [cardNumber], (err, result) => {
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

module.exports = CreditCardDAO;