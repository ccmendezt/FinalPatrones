const enviarCorreo = require('../../templates/enviarCorreo')
class BillDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

  async createBillDao(bill) {
    console.log("datossssssssssssssssssssssssssssssssssssss");
    console.log(bill.email);
    try{
      const sql = 'INSERT INTO `factura`( `costo`, `idReserva`) VALUES (?,?)';
      return new Promise((resolve, reject) => {
        this.dbConnection.query(sql, [bill.costo, bill.idReserva], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if(result.affectedRows > 0) {
              enviarCorreo.enviarEmail(bill.costo, bill.idReserva, bill.email, null, null, 'factura'); //Envio de correo electronico con la factura
              resolve(result.insertId);
            } else {
              reject('Error al crear usuario');
            }
          }
        });
      }
      );

    }catch(error){
      console.log(error);
    }
  }

  async getBillByReservDao(id) {
    try{
      const sql = 'SELECT * FROM `factura` WHERE `idReserva` = ?';
      return new Promise((resolve, reject) => {
        this.dbConnection.query(sql, [id], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if(result.length > 0) {
              resolve(result);
            } else {
              reject('Error al obtener factura');
            }
          }
        });
      }
      );
    }catch(error){
      console.log(error);
    }
  }

  async deleteBillForReservDao(id) {
    try{
      const sql = 'DELETE FROM `factura` WHERE `idReserva` = ?';
      return new Promise((resolve, reject) => {
        this.dbConnection.query(sql, [id], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if(result.affectedRows > 0) {
              resolve('Factura eliminada correctamente');
            } else {
              reject('Error al eliminar factura');
            }
          }
        });
      }
      );

    }catch(error){
      console.log(error);
    }
  }

}
module.exports = BillDAO;