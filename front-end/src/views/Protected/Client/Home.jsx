import React from 'react'
import Nav from '../../../components/PageComponents/Navbar'
import Footer from '../../../components/PageComponents/Footer'
import banner from '../../../images/bannerParkud1.png'
import car from '../../../images/CAR.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Nav></Nav>
      <div className='col-12'>
        <img src={banner} style={{ height: "90%" }}></img>
      </div>
      <div className='d-flex container'>
        <div className='col-6 mt-5'>
          <p>PAR-KUD se encuentra presente en múltiples ciudades de Colombia ofreciendo sus servicios con parqueaderos, cubiertos, descubiertos y semi-cubierto, ofreciendo precios excelentes para nuestro público.</p>
          <Link to='/ciudades'>
            <button className='btn btn-success'>Reserva Ahora</button>
          </Link>
        </div>
        <div className='col-6 mt-5 card-group'>
          <div className='card mx-1'>
            <img className='img-home' src={car}></img>
          </div>
          <div className='card mx-1'>
            <img className='img-home' src={car}></img>
          </div>
          <div className='card mx-1'>
            <img className='img-home' src={car}></img>
          </div>

        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
