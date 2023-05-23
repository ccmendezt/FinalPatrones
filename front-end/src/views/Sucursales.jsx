import React from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Navbar'
import imagen from '../images/CAR.jpg'
function Sucursales() {
  return (
    <div>
      <Nav></Nav>
      <div className='container'>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
          <div className='col'>
            <div className='card'>
              <img src={imagen} className='cad-img-top'></img>
              <div className='card-body'>
                <h5 class="card-title">Teusaquillo</h5>
                <p class="card-text">Esta es la sucursal de Teusaquillo</p>
                <p class="card-text"><small class="text-body-secondary">Calle 34 # 9 - 56 </small></p>
                <button className='btn btn-success'>Reservar</button>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card'>
              <img src={imagen} className='cad-img-top'></img>
              <div className='card-body'>
                <h5 class="card-title">Chapinero</h5>
                <p class="card-text">Esta es la sucursal de Chapinero</p>
                <p class="card-text"><small class="text-body-secondary">Calle 34 # 9 - 56 </small></p>
                <button className='btn btn-success'>Reservar</button>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card'>
              <img src={imagen} className='cad-img-top'></img>
              <div className='card-body'>
                <h5 class="card-title">Suba</h5>
                <p class="card-text">Esta es la sucursal de Suba</p>
                <p class="card-text"><small class="text-body-secondary">Calle 34 # 9 - 56 </small></p>
                <button className='btn btn-success'>Reservar</button>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card'>
              <img src={imagen} className='cad-img-top'></img>
              <div className='card-body'>
                <h5 class="card-title">Normandia</h5>
                <p class="card-text">Esta es la sucursal de Normandia</p>
                <p class="card-text"><small class="text-body-secondary">Calle 34 # 9 - 56 </small></p>
                <button className='btn btn-success'>Reservar</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer></Footer>
    </div >
  )
}

export default Sucursales