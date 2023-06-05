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
        //console.log(responseReserva.data);
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

  const correo = async (idUser) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${idUser}`);
      if (response.status === 200) {
        return response.data.email;
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleIngreso = async (idReserva) => {
    const fechaLocal = new Date().toLocaleDateString();
    const responseCorreo= await correo(idUser);
    for (let i = 0; i < reservas.length; i++) {
      if (parseInt(idReserva) === parseInt(reservas[i].idReserva)) {

        const horaInicioR = reservas[i].horaInicioR        ;
        const [horasR, minutosR] = horaInicioR.split(':');
        //console.log("Inicio Reserva: " + parseInt(horasR) + ":" + parseInt(minutosR))
        const horaFinR = reservas[i].horaFinR;
        const [horasF, minutosF] = horaFinR.split(':');
        //console.log("Fin Reserva: " + parseInt(horasF) + ":" + parseInt(minutosF))
        const horaLocal = new Date().toLocaleTimeString();
        const [horasL, minutosL] = horaLocal.split(':');
        //console.log("Local: " + parseInt(horasL) + ":" + parseInt(minutosL))

        const horaInicioRMinutos = parseInt(horasR) * 60 + parseInt(minutosR);
        const horaFinRMinutos = parseInt(horasF) * 60 + parseInt(minutosF);
        const horaLocalMinutos = parseInt(horasL) * 60 + parseInt(minutosL);

        // Validar la diferencia de tiempo
        const maxMinutosAntes = 5;
        const diferenciaMinutosEntrada = horaInicioRMinutos - horaLocalMinutos;
        //console.log("Diferencia mins entrada: " + diferenciaMinutosEntrada);
        const diferenciaMinutosSalida = horaLocalMinutos - horaFinRMinutos;
        //console.log("Diferencia mins salida: " + diferenciaMinutosSalida);

        if (fechaLocal === new Date(reservas[i].fechaReserva).toLocaleDateString()) {
          if (diferenciaMinutosSalida >= 0){ //No permite entrar si ya paso la hora de salida de la reserva
            console.log("NO Puede entrar al parqueadero");
          } else if (diferenciaMinutosEntrada <= maxMinutosAntes) { //Permite entrar 5 minutos antes de la hora de ingreso
            const esValido = diferenciaMinutosEntrada <= maxMinutosAntes;
            console.log("Valido?: " + esValido);
            try {
              const response = await axios.put(`${apiUrl}/reserv/update`, {
                fechaReserva: reservas[i].fechaReserva,
                horaInicioR: reservas[i].horaInicioR,
                horaFinR: reservas[i].horaFinR,
                horaEntrada: horaLocal,
                horaSalida: null,
                idParqueadero: reservas[i].idParqueadero.idParqueadero,
                idUsuario: reservas[i].idUsuario,
                tipoVehiculo: reservas[i].tipoVehiculo,
                placaVehiculo: reservas[i].placaVehiculo,
                idReserva: reservas[i].idReserva
              });
              if (response.status === 200) {
                Cookies.set('horaEntrada', horaLocal);
                Cookies.set('responseCorreo', responseCorreo);
                window.location.href = '/reservas';
              }
            } catch (e) {
              console.log(e.response.data);
            }
          }
        }else{
          alert("No puedes ingresar a esta reserva porque es de otro día");
        }
      }
    }
  };

  const handleSalida = async (idReserva) => {
    const fechaLocal = new Date().toLocaleDateString();
    const horaLocal = new Date().toLocaleTimeString();
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

        const correo = Cookies.get('responseCorreo')
        if (fechaLocal === new Date(reservas[i].fechaReserva).toLocaleDateString()) {

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
              placaVehiculo: reservas[i].placaVehiculo,
              idReserva: reservas[i].idReserva
            });
            if (response.status === 200) {
              try{
                const response = await axios.post(`${apiUrl}/bill/create`, {
                  costo: reservas[i].total,
                  idReserva: reservas[i].idReserva,
                  email: correo
                });
                if (response.status === 200) {  
                  alert('Gracias por usar nuestros servicios, una copida de la factura fue enviada a tu correo registrado');
                  window.location.href = '/reservas';
                }

              }catch(e){
                console.log(e.response.data);
              }
            }
          } catch (e) {
            console.log(e.response.data);
          }
        }
      }
    }
  }

  return (
    <>
      <Nav></Nav>
      <div className='container'>
        <div className='text-center'>
          <h1>Reservas</h1>
        </div>
        {data ? (
          reservas.map((reserva) => {
            return (
              reserva.horaSalida == null ? (
                <div className='d-flex' key={reserva.idReserva}>
                  <div className='col-6'>
                    <div className='card'>
                      <div className='card-body'>
                        <img src={imagen}></img>
                      </div>
                      <div className='card-title'>
                        <h3>{reserva.idParqueadero.nombreParqueadero}</h3>
                        <h4>{reserva.total}</h4>
  
                        {reserva.horaEntrada != null ? (
                          <div>
                            <h5>Ya ingresaste</h5>
                            <button className='btn btn-success' onClick={() => handleSalida(reserva.idReserva)}>Salida</button>
                          </div>
                        ) : (
                          <div>
                            <button className='btn btn-danger' onClick={() => handleCancel(reserva.idReserva)}>Cancelar</button>
                            <h5>Recuerda que para ingresar debes estar como máximo 5 min antes de la hora de la reserva</h5>
                            <h5>Todo listo? Ingresa!</h5>
                            <button className='btn btn-success' onClick={() => handleIngreso(reserva.idReserva)}>Ingresa</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-6 mt-5 text-left container mx-5'>
                    <div className='row mb-5'>
                      <div className='col-6'><b>Tarifa estacionamiento:</b></div>
                      {reserva.tipoVehiculo === 'C' ? (
                        <div className='col-4'>${reserva.tarifa = reserva.idParqueadero.tarifaCarro} pesos/minuto</div>
                      ) : reserva.tipoVehiculo === 'M' ? (
                        <div className='col-4'>${reserva.tarifa = reserva.idParqueadero.tarifaMoto} pesos/minuto</div>
                      ) : (
                        <div className='col-4'>${reserva.tarifa = reserva.idParqueadero.tarifaBici} pesos/minuto</div>
                      )}
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
                </div>
              ) : null
            );
          })
        ) : (
          <div className='text-center'>
            <h1>No tienes reservas</h1>
            <p>Reserva un parqueadero para poder verlo aquí</p>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default Reservas