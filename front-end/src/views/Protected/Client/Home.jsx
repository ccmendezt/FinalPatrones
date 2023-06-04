import React from 'react'
import Nav from '../../../components/PageComponents/Navbar'
import Footer from '../../../components/PageComponents/Footer'
import banner from '../../../images/bannerParkud1.png'
import car from '../../../images/CAR.jpg'

export default function Home() {
  return (
    <>
      <Nav></Nav>
      <div className='col-12'>
        <img src={banner} style={{ height: "90%" }}></img>
      </div>
      <div className='d-flex container'>
        <div className='col-6 mt-5 mx-3'>
          <p>Parkud Colombia cuenta con un amplio catálogo de sucursales en todo el país, en donde podrás encontrar distribuidos por ciudad los distintos parqueaderos, junto a su información completa, dirección, tarifa, horario de atención y mucho más,! Reserva ahora con nosotros!</p>
          <button className='btn btn-success'>Reserva Ahora</button>
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
