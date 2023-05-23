import React from 'react'
import Nav from '../components/Navbar'
import Car from '../images/niceCar.jpg'
import Footer from '../components/Footer'
function Conocenos() {
  return (
    <>
      <Nav></Nav>
      <div className='d-flex container'>
        <div className='col-6'>
          <img src={Car}></img>
        </div>
        <div className='set-middle'>
          <div className='container px-5'>
            <h2>PAR-KUD COLOMBIA</h2>
            <p className='text-align-justify container'>
              Par-kud Colombia ha ideado una nueva forma de parquear en las ciudades de Colombia,
              para facilitar el servicio y estandarizar un mismo servicio de parqueaderos de forma sistematizada a nivel
              nacional
            </p>
            <p className='text-align-justify container'>
              Par-kud se encuentra presente en multiples ciudades de Colombia ofreciendo sus servicios con parqueaderos, cubiertos, descubiertos y semi-cubierto, ofreciendo precios excelentes para nuestro publico.
            </p>
            <button className='btn btn-success'>Siganos</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Conocenos