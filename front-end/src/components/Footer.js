import React from 'react'
import imagen1 from '../images/logo1.png'
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
                            <p>
                                Proyecto para Diseño arquitectural de software y patrones de la universidad Distrital sobre un aplicativo de parqueaderos.
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4 pt-4">
                            <h6 className="text-uppercase fw-bold mb-1">Contactenos</h6>
                            <div className='d-flex mb-1'>
                                <div className='mx-2'><Facebook /></div>
                                <div className='mx-2'><Whatsapp /></div>
                                <div className='mx-2'><Twitter /></div>
                            </div>
                            <p><Map></Map> Bogotá , Col</p>
                            <p><Envelope></Envelope> info@softpatterns.com</p>
                            <p><Phone></Phone>+ 01 234 567 88</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer