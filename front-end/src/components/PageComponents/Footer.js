import React from 'react'
import imagen1 from '../../images/logo1.png'
import { Whatsapp, Facebook, Twitter, Phone, Map, Envelope } from 'react-bootstrap-icons';
function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <div className='pt-1'>
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <div className="logo d-flex">
                <img src={imagen1} alt="Logo" className="img-logo-footer"></img>
                <h1 className='center-nav mx-3'><span style={{ color: "black" }}>PAR-KUD</span></h1>
              </div>
              <p className='text-footer-parking'>
                Bienvenido a PARKUD Colombia, la innovadora solución de estacionamiento diseñada para mejorar tu 
                experiencia al parquear en las ciudades colombianas. Con nuestro equipo de desarrollo altamente 
                capacitado, hemos creado una nueva forma de estacionar que busca simplificar el servicio y estandarizarlo
                a nivel nacional.
              </p>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4 pt-4">
              <h6 className="text-uppercase fw-bold mb-1">Contáctenos</h6>
              <div className='d-flex mb-1'>
                <div className='mx-2'><Facebook /></div>
                <div className='mx-2'><Whatsapp /></div>
                <div className='mx-2'><Twitter /></div>
              </div>
              <p><Map></Map> Bogotá, Colombia</p>
              <p><Envelope></Envelope> parkudcolombia@gmail.com</p>
              <p><Phone></Phone>+ 57 311 215 1819</p>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer