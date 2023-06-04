import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import axios from 'axios'
import ReporteParqueadero from '../../../components/ReporteParqueadero';
import jszip, { forEach } from 'jszip';
import pdfmake from 'pdfmake';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-fixedheader-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-searchpanes-bs5';
import 'datatables.net-select-bs5';

<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" />
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
  console.log(reportes)

  var dataTbl = [];
  reportes.forEach(e => {
    dataTbl.push([
      e.idReserva,
      new Date(e.fechaReserva).toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      e.horaInicioR,
      e.horaFinR,
      e.horaEntrada,
      e.horaSalida,
      e.tipoVehiculo,
      // e.placaVehiculo,
      e.nombreUsuario,
      e.parqueadero,
      e.costo
    ]);
  });
  console.log(dataTbl)
  let table = new DataTable('#tableReportes', {
    responsive: {
      details: {
        type: "column",
        target: "tr",
      },
    },
    data: dataTbl,
    jszip: true,
    destroy: true,
    paging: true,
    dom: "Bfrtip",
    pdfmake:true
  });

  return (
    <div>
      <AdminNav></AdminNav>

      <div className='container'>
        <h1 className="titleIniciarSesion">Reportes</h1>
        <div className='d-flex mb-3'>
          {/* <button type="button" className="btn btn-success" style={{ maxWidth: "200px" }}>Reporte parqueadero</button>
          <button type="button" className="btn btn-success">Reporte ingresos</button>
          <button type="button" className="btn btn-success">Reporte personas</button> */}
        </div>
        <div>
          <table className="table table-striped hover" id='tableReportes' >
            <thead>
              <tr>
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
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Reportes