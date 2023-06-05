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
              enviarCorreo.enviarEmail(bill.costo, bill.idReserva, bill.email, null, null, 'factura'); //Envio de correo electronico a nuevo usuario
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

}
module.exports = BillDAO;