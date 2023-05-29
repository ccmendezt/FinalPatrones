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
        <div className='col-6 mt-5'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut incidunt modi reiciendis quia cupiditate vero possimus, ipsam eos nihil, id hic debitis assumenda vitae expedita at molestiae doloribus recusandae necessitatibus!</p>
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
