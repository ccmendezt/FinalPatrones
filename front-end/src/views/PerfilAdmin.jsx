import React from 'react'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import imagen from '../images/niceCar.jpg'
import { Mailbox, Telephone } from 'react-bootstrap-icons'

function PerfilAdmin() {
  return (
    <div>
        <AdminNav></AdminNav>
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
                            <h1 className=' mt5'>Perfil Administrador</h1>
                            <hr className="mt-0 mb-4"></hr>
                            <div className='row mb-5'>
                                <div className='col-6'><b><Telephone></Telephone> Telefono:</b></div>
                                <div className='col-6'><b>+57 3555454524</b></div>
                            </div>
                            <div className='row mb-5'>
                                <div className='col-6'><b><Mailbox></Mailbox> Email:</b></div>
                                <div className='col-6'><b>andream@gmail.com</b></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer></Footer>
    </div>
  )
}

export default PerfilAdmin