import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import axios from 'axios'
import ReporteParqueadero from '../../../components/ReporteParqueadero';
//mport DataTable from 'react-data-table-component';

//<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />
function Reportes() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [reportes, setReportes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reportes`);
        setReportes(response.data);
        console.log(reportes)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminNav></AdminNav>

      <div className='container'>
        <h1 className="titleIniciarSesion">Reportes</h1>
        <div className='d-flex mb-3'>
          <button type="button" className="btn btn-success" style={{ maxWidth: "200px" }}>Reporte parqueadero</button>
          <button type="button" className="btn btn-success">Reporte ingresos</button>
          <button type="button" className="btn btn-success">Reporte personas</button>
        </div>
        <div>
          <table className="table table-striped">
            <thead>
              <th>id reserva</th>
              <th>Fecha de la reserva</th>
              <th>Hora inicio reserva</th>
              <th>Hora fin reserva</th>
              <th>Hora de entrada</th>
              <th>Hora de salida</th>
              <th>Vehiculo</th>
              <th>Usuario</th>
              <th>Sucursal</th>
              <th>Valor</th>
            </thead>
            <tbody>
              {
                reportes.map((reporte) => {
                  return (<ReporteParqueadero
                    key={reporte.idReserva}
                    idReserva={reporte.idReserva}
                    fechaReserva={reporte.fechaReserva}
                    horaInicioR={reporte.horaInicioR}
                    horaFinR={reporte.horaFinR}
                    horaEntrada={reporte.horaEntrada}
                    horaSalida={reporte.horaSalida}
                    tipoVehiculo={reporte.tipoVehiculo}
                    nombreUsuario={reporte.nombreUsuario}
                    parqueadero={reporte.parqueadero}
                    costo={reporte.costo}
                  />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Reportes