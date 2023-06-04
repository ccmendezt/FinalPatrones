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
        setReservas(responseReserva.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className='container'>
        <div className='text-center'>
          <h1>Reservas</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quo reprehenderit error officiis sit recusandae ab voluptate consequuntur, modi reiciendis tempora impedit ullam unde, doloribus cumque iure enim, accusantium fugit.</p>
        </div>
        {
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
                    <button className='btn btn-success'>Pagar</button>
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
          })
        }
      </div>
      <Footer></Footer>
    </>
  )
}

export default Reservas