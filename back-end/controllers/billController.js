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

exports.getBillByReserv = async (req, res) => {
  try{
    const id = req.params.id;
    const result = await billDao.getBillByReservDao(id);
    res.json(result);
  }catch(error){
    console.log(error);
  }
}

exports.deleteBillForReserv = async (req, res) => {
  try{
    const id = req.params.id;
    const result = await billDao.deleteBillForReservDao(id);
    res.json(result);
  }catch(error){
    console.log(error);
  }
}
