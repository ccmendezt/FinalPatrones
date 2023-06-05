import React from 'react'
import Nav from '../../../components/PageComponents/Navbar'
import Car from '../../../images/niceCar.jpg'
import Footer from '../../../components/PageComponents/Footer'
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
              PAR-KUD Colombia ha ideado una nueva forma de parquear en las ciudades de Colombia,
              para facilitar el servicio y estandarizar un mismo servicio de parqueaderos de forma sistematizada a nivel
              nacional.
            </p>
            <p className='text-align-justify container'>
              PAR-KUD se encuentra presente en múltiples ciudades de Colombia ofreciendo sus servicios con parqueaderos, cubiertos, descubiertos y semi-cubierto, ofreciendo precios excelentes para nuestro público.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Conocenos