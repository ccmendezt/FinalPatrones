const connectionDB = require('../database/db');
const billDAO = require('./DAO/billDAO');
const billDao = new billDAO(connectionDB);

exports.createBill = async (req, res) => {
  try{
    const bill = req.body;
    const result = await billDao.createBillDao(bill);
    res.json(result);
  }catch(error){
    console.log(error);
  }
}
