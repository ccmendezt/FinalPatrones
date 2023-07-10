class ReservDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

  async createReservDao(reserv) {
    const sql = 'INSERT INTO `reserva`(`tipoReserva`,	`EstadoR`, `fechaReserva`, `fechaFinReserva`, `FechaSisR`, `horaInicioR`, `horaFinR`, `horaEntrada`, `horaSalida`, `idParqueadero`, `idUsuario`, `tipoVehiculo`, `placaVehiculo`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [reserv.tipoReserva, 'R', reserv.fechaReserva, null, reserv.FechaSisR, reserv.horaInicioR, reserv.horaFinR, null, null, reserv.idParqueadero, reserv.idUsuario, reserv.tipoVehiculo, reserv.placaVehiculo], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.affectedRows == 0) {
            reject('No se pudo crear la reserva');
          }
          resolve(result.insertId);
        }
      });
    }
    );
  }

  async createReservSemanalDao(reserv) {
    const sql = 'INSERT INTO `reserva`(`tipoReserva`,	`EstadoR`, `fechaReserva`, `fechaFinReserva`, `FechaSisR`, `horaInicioR`, `horaFinR`, `horaEntrada`, `horaSalida`, `idParqueadero`, `idUsuario`, `tipoVehiculo`, `placaVehiculo`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [reserv.tipoReserva, 'R', reserv.fechaReserva, reserv.fechaFinReserva, reserv.FechaSisR, reserv.horaInicioR, reserv.horaFinR, null, null, reserv.idParqueadero, reserv.idUsuario, reserv.tipoVehiculo, reserv.placaVehiculo], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.affectedRows == 0) {
            reject('No se pudo crear la reserva');
          }
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
          if (result.length == 0) {
            reject('No se encontraron reservas');
          }
          resolve(result);
        }
      });
    });
  }

  async getReservByEstado(estado, fechaActual) {
    const sql = 'SELECT * FROM `reserva` WHERE EstadoR = ? AND fechaReserva = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [estado, fechaActual], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.length == 0) {
            //reject('No se encontraron reservas');
          }
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
          if (result.length == 0) {
            reject('No se encontro la reserva');
          }
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
          if (result.length == 0) {
            reject('No se encontraron reservas');
          }
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
          if (result.length == 0) {
            reject('No se encontraron reservas');
          }
          resolve(result);
        }
      });
    });
  }

  async updateReservDao(reserv) {
    const sql = 'UPDATE `reserva` SET `EstadoR`=?, `fechaReserva`=?, `horaInicioR`=?, `horaFinR`=?, `horaEntrada`=?, `horaSalida`=?, `idParqueadero`=?, `idUsuario`=?, `tipoVehiculo` =? WHERE idReserva = ?';
    return new Promise((resolve, reject) => {
      this.dbConnection.query(sql, [reserv.EstadoR, reserv.fechaReserva, reserv.horaInicioR, reserv.horaFinR, reserv.horaEntrada, reserv.horaSalida, reserv.idParqueadero, reserv.idUsuario,reserv.tipoVehiculo , reserv.idReserva], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
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
          resolve(result);
        }
      });
    });
  }

  //mala paractica pero se necesita para gestion, verificacion y validacion 

  async getUserByIdDao(idUser) {
    const sql = 'SELECT * FROM `usuario` WHERE idUsuario = ?';
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
module.exports = ReservDAO;