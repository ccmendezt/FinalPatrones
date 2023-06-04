import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);



function Estadisticas() {

  
  let key="";
  let tipoVehiculo="";
  let parqueadero="";
  const apiUrl = process.env.REACT_APP_API_URL;
  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/estadisticas`);
        setEstadisticas(response.data);
        console.log(response.data)
        console.log(estadisticas)
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
    }else if (e.tipoVehiculo == "M") {
        repetidos.push("Moto");
    }else{
      repetidos.push("Bicicleta")
    }
  });
  console.log(repetidos)
  //separa los resultados nulos
  let repetidosNN = repetidos.filter(dato => dato != null);
  //console.log(repetidosNN)
  //busca las veces que se repite cada valor
  const resultado = repetidosNN.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
  //console.log(resultado)
  //se dejan los valores sin repetir para poner los labels de la gráfica
  let dataGraph = new Set(repetidosNN);
  //console.log(dataGraph)
  //quita el valor de null
  let respGraph = [...dataGraph].filter(dato => dato != null);
  //console.log(respGraph)
  //se eliminan los valores nulos
  let resultGraph = Object.values(resultado);
  console.log(resultGraph)
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
      <div id='acquisitions'>
        <div className='set-middle' style={{width:"500px"}}>
          <Pie data={data} />
        </div>
        <div >
          Se han usado {resultGraph[0]} cupos para Carros 
        </div>
        <div>
          Se han usado {resultGraph[1]} cupos para Motos 
        </div>
        <div>
          Se han usado {resultGraph[2]} cupos para Ciclas 
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Estadisticas