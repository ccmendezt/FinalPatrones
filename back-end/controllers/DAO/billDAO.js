class BillDAO {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

  async createBillDao(bill) {
    try{
      const sql = 'INSERT INTO `factura`( `costo`, `idReserva`) VALUES (?,?)';
      return new Promise((resolve, reject) => {
        this.dbConnection.query(sql, [bill.costo, bill.idReserva], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.affectedRows == 0) {
              reject('No se pudo crear la factura');
            }
            resolve(result.insertId);
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