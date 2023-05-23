import React from 'react'
import imagen from '../images/niceCar.jpg'
import imagenCard from '../images/CreditCard.jpg'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import { Telephone } from 'react-bootstrap-icons'



function Perfil() {

  return (
    <>
      <Nav></Nav>
      <div className='container'>
        <div className='card mb-5'>
          <div className='d-flex'>
            <div className='col-6'>
              <div className=''>
                <div className='card-body'>
                  <img src={imagen}></img>
                </div>
                <div className='card-title'>
                  <h3>Andrea Marín Gaviria</h3>
                </div>
              </div>
            </div>
            <div className='col-6 text-left container mx-5 card-body'>
              <h1 className=' mt5'>Perfil</h1>
              <hr className="mt-0 mb-4"></hr>
              <div className='row mb-5'>
                <div className='col-6'><b><Telephone></Telephone> Telefono:</b></div>
                <div className='col-6'><b>+57 3555454524</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b>Email:</b></div>
                <div className='col-6'><b>andream@gmail.com</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b>Cantidad de reservas:</b></div>
                <div className='col-6'><b>5</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b>Cliente fiel:</b></div>
                <div className='col-6'><b>No</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3" >
          <div className="row g-0">
            <div className="col-md-5 px-3 gradient-custom text-center text-white">
              <img src={imagenCard} alt="Avatar" className="img-fluid my-5    " />
              <i className="far fa-edit mb-5"></i>
            </div>
            <div className="col-md-6">
              <div className="card-body p-4">
                <h1>Medio de pago</h1>
                <hr className="mt-0 mb-4"></hr>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6><b>Numero de tarjeta:</b></h6>
                    <p className="text-muted">123456789 </p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6><b>Fecha de expiración:</b></h6>
                    <p className="text-muted">15/08/2025</p>
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6><b>CVV:</b></h6>
                    <p className="text-muted">439</p>
                  </div>
                </div>
                <hr className="mt-0 mb-4"></hr>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6><b>Propietario:</b></h6>
                    <p className="text-muted">Andrea Marín gaviria</p>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                  <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                  <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Perfil