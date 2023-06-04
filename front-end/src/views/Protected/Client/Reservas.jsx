import React, { useState, useEffect } from 'react'
import Nav from '../../../components/PageComponents/Navbar'
import Footer from '../../../components/PageComponents/Footer'
import imagen from '../../../images/parqueaderoT.jpg'
import axios from 'axios'
import Cookies from 'js-cookie'

function Reservas() {
  const idUser = Cookies.get('idUser');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [reservas, setReservas] = useState([]);
  const [data, setData] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);

  const horaInicioR = "1:32:00";
  const [horasR, minutosR] = horaInicioR.split(':');
  console.log("Inicio Reserva: " + parseInt(horasR) + ":" + parseInt(minutosR))
  const horaFinR = "1:37:00";
  const [horasF, minutosF] = horaFinR.split(':');
  console.log("Fin Reserva: " + parseInt(horasF) + ":" + parseInt(minutosF))
  const horaLocal = new Date().toLocaleTimeString();
  const [horasL, minutosL] = horaLocal.split(':');
  console.log("Local: " + parseInt(horasL) + ":" + parseInt(minutosL))

  const horaInicioRMinutos = parseInt(horasR) * 60 + parseInt(minutosR);
  const horaFinRMinutos = parseInt(horasF) * 60 + parseInt(minutosF);
  const horaLocalMinutos = parseInt(horasL) * 60 + parseInt(minutosL);

  // Validar la diferencia de tiempo
  const maxMinutosAntes = 5;
  const diferenciaMinutosEntrada = horaInicioRMinutos - horaLocalMinutos;
  console.log("Diferencia mins entrada: " + diferenciaMinutosEntrada);
  const diferenciaMinutosSalida = horaLocalMinutos - horaFinRMinutos;
  console.log("Diferencia mins salida: " + diferenciaMinutosSalida);
  if (diferenciaMinutosSalida >= 0){ //No permite entrar si ya paso la hora de salida de la reserva
    console.log("NO Puede entrar al parqueadero");
  } else if (diferenciaMinutosEntrada <= maxMinutosAntes) { //Permite entrar 5 minutos antes de la hora de ingreso
    const esValido = diferenciaMinutosEntrada <= maxMinutosAntes;
    console.log("Valido?: " + esValido);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseReserva = await axios.get(`${apiUrl}/reserv/user/${idUser}`);
        var responseParking;
        for (let i = 0; i < responseReserva.data.length; i++) {
          // Obtener el parqueadero de la reserva
          responseParking = await axios.get(`${apiUrl}/parking/${responseReserva.data[i].idParqueadero}`);
          responseReserva.data[i].idParqueadero = responseParking.data;

          // Calcular el tiempo de reserva
          const [horaInicioR, minInicioR, segInicioR] = responseReserva.data[i].horaInicioR.split(':');
          const [horaFinR, minFinR, segFinR] = responseReserva.data[i].horaFinR.split(':');
          const hora1 = new Date();
          hora1.setHours(horaInicioR, minInicioR, segInicioR);
          const hora2 = new Date();
          hora2.setHours(horaFinR, minFinR, segFinR);

          // Calcular la diferencia en minutos
          const diferenciaEnMilisegundos = hora2 - hora1;
          const diferenciaEnMinutos = Math.floor(diferenciaEnMilisegundos / 60000);
          responseReserva.data[i].tiempoReserva = diferenciaEnMinutos;
        }
        console.log(responseReserva.data);
        responseReserva.data.map((reserva) => {
          reserva.ingresado = false;
        });
        setReservas(responseReserva.data);
        setData(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async (idReserva) => {
    try {
      const response = await axios.delete(`${apiUrl}/reserv/delete/${idReserva}`);
      if (response.status === 200) {
        window.location.href = '/reservas';
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleIngreso = async (idReserva) => {
    const fechaLocal = new Date().toLocaleDateString();
    const horaLocal = new Date().toLocaleTimeString();
    setSelectedReserva(idReserva);

    for (let i = 0; i < reservas.length; i++) {
      if (parseInt(idReserva) === parseInt(reservas[i].idReserva)) {
        const horaInicio = new Date(reservas[i].fechaReserva);
        const horaFin = new Date(reservas[i].fechaReserva);


        const horaInicioP = new Date(reservas[i].fechaReserva);
        const [horas, minutos] = reservas[i].horaInicioR.split(':');
        const [horasF, minutosF] = reservas[i].horaFinR.split(':');
        const [horasL, minutosL] = horaLocal.split(':');

        console.log(horaLocal);

        horaInicio.setHours(horas);
        horaFin.setHours(horasF);
        horaFin.setMinutes(minutosF);

        horaInicioP.setHours(horas);
        horaInicioP.setMinutes(minutos);

        const horaInicioMenos5 = new Date(horaInicioP.getTime() - 5 * 60000); // Restar 5 minutos en milisegundos

        const horaInicioMenos5_Horas = horaInicioMenos5.getHours();
        const horaInicioMenos5_Minutos = horaInicioMenos5.getMinutes();

        const horaFinHoras = horaFin.getHours();
        const horaFinMinutos = horaFin.getMinutes();

        console.log(reservas[i].idParqueadero.idParqueadero);
        console.log(reservas[i].idUsuario);


        if (fechaLocal === new Date(reservas[i].fechaReserva).toLocaleDateString()) {
          alert('Puedes ingresar');
          try {
            const response = await axios.put(`${apiUrl}/reserv/update/`, {
              fechaReserva: reservas[i].fechaReserva,
              horaInicioR: reservas[i].horaInicioR,
              horaFinR: reservas[i].horaFinR,
              horaEntrada: horaLocal,
              horaSalida: null,
              idParqueadero: reservas[i].idParqueadero.idParqueadero,
              idUsuario: reservas[i].idUsuario,
              tipoVehiculo: reservas[i].tipoVehiculo,
              idReserva: reservas[i].idReserva,
            });
            if (response.status === 200) {
              handleCancel(idReserva);
              window.location.href = '/reservas';
              Cookies.set('horaEntrada', horaLocal);
            }
          } catch (e) {
            console.log(e.response.data);
          }
        }
      }
    }
  };

  const handleSalida = async (idReserva) => {
    const fechaLocal = new Date().toLocaleDateString();
    const horaLocal = new Date().toLocaleTimeString();
    setSelectedReserva(idReserva);
    const horaEntrada = Cookies.get('horaEntrada');
    console.log(horaEntrada);

    for (let i = 0; i < reservas.length; i++) {
      if (parseInt(idReserva) === parseInt(reservas[i].idReserva)) {
        const horaInicio = new Date(reservas[i].fechaReserva);
        const horaFin = new Date(reservas[i].fechaReserva);


        const horaInicioP = new Date(reservas[i].fechaReserva);
        const [horas, minutos] = reservas[i].horaInicioR.split(':');
        const [horasF, minutosF] = reservas[i].horaFinR.split(':');
        const [horasL, minutosL] = horaLocal.split(':');

        console.log(horaLocal);

        horaInicio.setHours(horas);
        horaFin.setHours(horasF);
        horaFin.setMinutes(minutosF);

        horaInicioP.setHours(horas);
        horaInicioP.setMinutes(minutos);

        const horaInicioMenos5 = new Date(horaInicioP.getTime() - 5 * 60000); // Restar 5 minutos en milisegundos

        const horaInicioMenos5_Horas = horaInicioMenos5.getHours();
        const horaInicioMenos5_Minutos = horaInicioMenos5.getMinutes();

        const horaFinHoras = horaFin.getHours();
        const horaFinMinutos = horaFin.getMinutes();

        console.log(reservas[i].idParqueadero.idParqueadero);
        console.log(reservas[i].idUsuario);

        
        if (fechaLocal === new Date(reservas[i].fechaReserva).toLocaleDateString()) {
          alert('Puedes ingresar');
          try {
            const response = await axios.put(`${apiUrl}/reserv/update/`, {
              fechaReserva: reservas[i].fechaReserva,
              horaInicioR : reservas[i].horaInicioR,
              horaFinR : reservas[i].horaFinR,
              horaEntrada: horaEntrada,
              horaSalida: horaLocal,
              idParqueadero: reservas[i].idParqueadero.idParqueadero,
              idUsuario: reservas[i].idUsuario,
              tipoVehiculo: reservas[i].tipoVehiculo,
              idReserva: reservas[i].idReserva,
            });
            if (response.status === 200) {

              window.location.href = '/reservas';
              Cookies.set('horaEntrada', horaLocal);
            }
          } catch (e) {
            console.log(e.response.data);
          }
        }
      }
    }
  }

  console.log(reservas);

  return (
    <>
      <Nav></Nav>
      <div className='container'>
        <div className='text-center'>
          <h1>Reservas</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quo reprehenderit error officiis sit recusandae ab voluptate consequuntur, modi reiciendis tempora impedit ullam unde, doloribus cumque iure enim, accusantium fugit.</p>
        </div>
        {data ? (
          reservas.map((reserva) => {
            return (<div className='d-flex' key={reserva.idReserva}>
              <div className='col-6'>
                <div className='card'>
                  <div className='card-body'>
                    <img src={imagen}></img>
                  </div>
                  <div className='card-title'>
                    <h3>{reserva.idParqueadero.nombreParqueadero}</h3>
                    <h4>{reserva.total}</h4>

                    {reserva.horaEntrada != null ?
                      (
                        <div>
                          <h5>Ya ingresaste</h5>
                          <button className='btn btn-success' onClick={() => handleSalida(reserva.idReserva)}>Salida</button>
                        </div>
                      )

                      :
                      (<div>
                        <button className='btn btn-danger' onClick={() => handleCancel(reserva.idReserva)}>Cancelar</button>
                        <h5>Recuerda que para ingresar debes estar como maximo 5 min antes de la hora de la reserva</h5>
                        <h5>Todo listo? Ingresa!</h5>
                        <button className='btn btn-success' onClick={() => handleIngreso(reserva.idReserva)}>Ingresa</button>
                      </div>)
                    }

                  </div>
                </div>
              </div>
              <div className='col-6 mt-5 text-left container mx-5'>
                <div className='row mb-5'>
                  <div className='col-6'><b>Tarifa estacionamiento:</b></div>
                  {
                    reserva.tipoVehiculo === 'C' ? (
                      <div className='col-4'>${reserva.tarifa = reserva.idParqueadero.tarifaCarro} pesos/minuto</div>
                    ) : reserva.tipoVehiculo === 'M' ? (
                      <div className='col-4'>${reserva.tarifa = reserva.idParqueadero.tarifaMoto} pesos/minuto</div>
                    ) : (
                      <div className='col-4'>${reserva.tarifa = reserva.idParqueadero.tarifaBici} pesos/minuto</div>
                    )

                  }
                </div>
                <div className='row mb-5'>
                  <div className='col-6'><b>Hora inicio Reserva:</b></div>
                  <div className='col-4'>{new Date(reserva.fechaReserva).toLocaleDateString()} - {reserva.horaInicioR}</div>
                </div>
                <div className='row mb-5'>
                  <div className='col-6'><b>Hora de salida:</b></div>
                  <div className='col-4'>{new Date(reserva.fechaReserva).toLocaleDateString()} - {reserva.horaFinR}</div>
                </div>
                <div className='row mb-5'>
                  <div className='col-6'><b>Tiempo utilizado:</b></div>
                  <div className='col-4'>{reserva.tiempoReserva} minutos</div>
                </div>
                {/* <div className='row mb-5'>
                  <div className='col-6'><b>Descuento</b></div>
                  <div className='col-4'><b>$0</b></div>
                </div> */}
                <div className='row mb-5'>
                  <div className='col-6'><b>Valor Total:</b></div>
                  <div className='col-4'>${reserva.total = reserva.tarifa * reserva.tiempoReserva}</div>
                </div>
              </div>
            </div>)
          }))
          :
          (
            <div className='text-center'>
              <h1>No tienes reservas</h1>
              <p>Reserva un parqueadero para poder verlo aquí</p>
            </div>
          )

        }
      </div>
      <Footer></Footer>
    </>
  )
}

export default Reservas