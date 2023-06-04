import React from 'react'
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'

function Reportes() {
  return (
    <div>
      <AdminNav></AdminNav>
      <div className='container'>
        <h1 className="titleIniciarSesion">Reportes</h1>
        <div className='d-flex mb-3'>
          <button type="button" className="btn btn-success" style={{maxWidth:"200px"}}>Reporte parqueadero</button>
          <button type="button" className="btn btn-success">Reporte ingresos</button>
          <button type="button" className="btn btn-success">Reporte personas</button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Reportes