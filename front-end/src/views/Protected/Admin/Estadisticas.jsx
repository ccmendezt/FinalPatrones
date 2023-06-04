import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);



function Estadisticas() {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/estadisticas`);
        setEstadisticas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  var repetidos = [];
  estadisticas.forEach(e => {
    if (e.tipoVehiculo == "C") {
      repetidos.push("Carro");
    } else if (e.tipoVehiculo == "M") {
      repetidos.push("Moto");
    } else {
      repetidos.push("Bicicleta")
    }
  });

  //separa los resultados nulos
  let repetidosNN = repetidos.filter(dato => dato != null);

  //busca las veces que se repite cada valor
  const resultado = repetidosNN.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});

  //se dejan los valores sin repetir para poner los labels de la gráfica
  let dataGraph = new Set(repetidosNN);

  //quita el valor de null
  let respGraph = [...dataGraph].filter(dato => dato != null);

  //se eliminan los valores nulos
  let resultGraph = Object.values(resultado);

  const data = {
    labels: respGraph,
    datasets: [
      {
        label: 'Cantidad',
        data: resultGraph,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <AdminNav></AdminNav>
      <div className='container'>
        <h1 className="titleIniciarSesion">Estadísticas</h1>
        <div className='d-flex mb-3 set-middle'>
          <a href='/estadisticas'><button type="button" className="btn btn-success mx-3" style={{ maxWidth: "200px" }}>Estadísticas vehículos</button></a>
          <a href='/estadisticas/parqueadero'><button type="button" className="btn btn-success" style={{ maxWidth: "250px" }}>Estadísticas parqueadero</button></a>
        </div>
        <div id='acquisitions'>
          <h3 className='inputLabel'>Estadísticas de los cupos segun el vehiculo usado</h3>
          <div className='text-left'>
            Se han usado <b>{resultGraph[0]} </b>cupos para Carros segun las reservas.
          </div>
          <div className='text-left'>
            Se han usado <b>{resultGraph[1]}</b> cupos para Motos segun las reservas.
          </div>
          <div className='text-left'>
            Se han usado <b>{resultGraph[2]}</b> cupos para Ciclas segun las reservas.
          </div>
          <div className='set-middle' style={{ width: "500px" }}>
            <Pie data={data} />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Estadisticas