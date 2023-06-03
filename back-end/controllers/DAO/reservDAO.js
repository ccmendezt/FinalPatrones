class ReservDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

  async createReservDao(reserv) {
    const sql = 'INSERT INTO `reserva`(`fechaReserva`, `horaInicioR`, `horaFinR`, `horaEntrada`, `horaSalida`, `idParqueadero`, `idUsuario`, `tipoVehiculo`) VALUES (?,?,?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [reserv.fechaReserva, reserv.horaInicioR, reserv.horaFinR, null, null, reserv.idParqueadero, reserv.idUsuario, reserv.tipoVehiculo], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log(result);
          resolve(result.insertId);
        }
      });
    }
    );
  }

  async getAllReservDao() {
    const sql = 'SELECT * FROM `reserva`';
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

  async getReservByIdDao(idReserv) {
    const sql = 'SELECT * FROM `reserva` WHERE idReserva = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [idReserv], (err, result) => {
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

  async getReservByUserDao(idUser) {
    const sql = 'SELECT * FROM `reserva` WHERE idUsuario = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [idUser], (err, result) => {
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

  async getReservByParkingDao(idParking) {
    const sql = 'SELECT * FROM `reserva` WHERE idParqueadero = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [idParking], (err, result) => {
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

  async updateReservDao(reserv) {
    const sql = 'UPDATE `reserva` SET `fechaReserva`=?, `horaInicioR`=?, `horaFinR`=?, `horaEntrada`=?, `horaSalida`=?, `idParqueadero`=?, `idUsuario`=? WHERE idReserva = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [reserv.fechaReserva, reserv.horaInicioR, reserv.horaFinR, null, null, reserv.idParqueadero, reserv.idUsuario, reserv.idReserva], (err, result) => {
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


  async deleteReservDao(idReserv) {
    const sql = 'DELETE FROM `reserva` WHERE idReserva = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [idReserv], (err, result) => {
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
module.exports = ReservDAO;