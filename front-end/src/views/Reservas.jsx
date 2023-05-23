import React from 'react'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import imagen from '../images/parqueaderoT.jpg'

function Reservas() {
    return (
        <>
            <Nav></Nav>
            <div className='container'>
                <div className='text-center'>
                    <h1>Reservas</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quo reprehenderit error officiis sit recusandae ab voluptate consequuntur, modi reiciendis tempora impedit ullam unde, doloribus cumque iure enim, accusantium fugit.</p>
                </div>
                <div className='d-flex'>
                    <div className='col-6'>
                        <div className='card'>
                            <div className='card-body'>
                                <img src={imagen}></img>
                            </div>
                            <div className='card-title'>
                                <h3>Chapinero</h3>
                                <h4>$15.000</h4>
                                <button className='btn btn-success'>Pagar</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-6 mt-5 text-left container mx-5'>
                        <div className='row mb-5'>
                            <div className='col-6'><b>Tarifa estacionamiento:</b></div>
                            <div className='col-4'><b>$75 x minuto</b></div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'><b>Hora inicio Reserva:</b></div>
                            <div className='col-4'><b>15/05/2023 13:00:00</b></div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'><b>Hora de salida:</b></div>
                            <div className='col-4'><b>15/05/2023 14:00:00</b></div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'><b>Tiempo utilizado:</b></div>
                            <div className='col-4'><b>60 minutos</b></div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'><b>Descuento</b></div>
                            <div className='col-4'><b>$0</b></div>
                        </div>
                        <div className='row mb-5'>
                            <div className='col-6'><b>Valor Total:</b></div>
                            <div className='col-4'><b>$15.000</b></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Reservas