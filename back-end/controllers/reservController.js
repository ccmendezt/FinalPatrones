const connectionDB = require('../database/db');
const reservDAO = require('./DAO/reservDAO');
const reservDao = new reservDAO(connectionDB);
const enviarCorreo = require('../templates/enviarCorreo');

exports.createReserv = async (req, res) => {
  const reserv = req.body;
  try {
    if(reserv.tipoReserva == 'U'){
    const result = await reservDao.createReservDao(reserv);
    res.json(result);
    }else{
      const result = await reservDao.createReservSemanalDao(reserv);
      res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
}

exports.getAllReserv = async (req, res) => {
  try {
    const result = await reservDao.getAllReservDao();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener las reservas" });
  }
}

exports.getReservById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await reservDao.getReservByIdDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener la reserva" });
  }
}

exports.getReservByUser = async (req, res) => {
  try {
    const id = req.params.iduser;
    const result = await reservDao.getReservByUserDao(id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }


}

exports.getReservByParking = async (req, res) => {
  const id = req.params.idparking;
  try {
    const result = await reservDao.getReservByParkingDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener las reservas" });
  }
}

exports.updateReserv = async (req, res) => {
  try {
    const reserv = req.body;
    const result = await reservDao.updateReservDao(reserv);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}

exports.deleteReserv = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await reservDao.deleteReservDao(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al eliminar la reserva" });
  }
}

exports.cancelarReservasPendientes = async (req, res) => {
  const estado = 'R';
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const day = String(fechaActual.getDate()).padStart(2, '0');
  const fechaActualFormatted = `${year}-${month}-${day}`;
  try {
    const result = await reservDao.getReservByEstado(estado, fechaActualFormatted);
    for (let i = 0; i < result.length; i++) {

      const [hora, minuto, segundo] = result[i].horaInicioR.split(':'); // Separar la hora, minutos y segundos de la hora de llegada
      const horaLlegada = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate(), hora, minuto, segundo); // Combinar la fecha actual con la hora de llegada
      const diferenciaMinutos = Math.round((fechaActual - horaLlegada) / (1000 * 60));

      // Si han pasado más de 5 minutos y la reserva no ha cambiado a 'en uso', cancelarla
      if (diferenciaMinutos > 5 && result[i].EstadoR === 'R') {
        await reservDao.deleteReservDao(result[i].idReserva);
        console.log(`Reserva ${result[i].idReserva} cancelada`);

        // Buscar el correo del usuario
        const user = await reservDao.getUserByIdDao(result[i].idUsuario);

        // Enviar correo electrónico al usuario
        enviarCorreo.enviarEmail(user.nombre, result[i].idReserva, user.email, null, null, 'cancelacion');

      }
    }
  } catch (error) {
    console.log(error);
  }
}

