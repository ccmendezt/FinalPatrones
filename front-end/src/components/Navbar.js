import React from 'react'
import '../styles/nav.css'
import imagen1 from '../images/logo1.png'

function Nav() {
    return (
        <>
            <div className="container d-flex align-items-center justify-content-between">

                <div className="logo d-flex">

                    <h2 className='center-nav mx-3'>
                        <a className='logo-text' href="/home"><img src={imagen1} alt="Logo" className="img-logo"></img><span>PAR-KUD</span></a>
                    </h2>
                </div>

                <nav id="navbar" className="navbar">
                    <ul>
                        <li><a className="nav-link scrollto" href="/home">Inicio <i class="bi bi-house"></i></a></li>
                        <li><a className="nav-link scrollto" href="/About">Conocenos <i class="bi bi-person-vcard-fill"></i></a></li>
                        <li><a className="nav-link scrollto" href="/sucursales">Sucursales<i class="bi bi-cart-check"></i></a></li>
                        <li><a className="nav-link scrollto" href="/reservas">Reservas <i class="bi bi-box"></i></a></li>
                        <li className="dropdown"><a className="nav-link scrollto" href="/perfil">Perfil <i class="bi bi-person-circle"> <i className="bi bi-chevron-down"></i></i></a>
                            <ul>
                                <li><a href="/perfil">Ver perfil</a></li>
                                <li><a href="/login">Salir</a></li>
                            </ul>
                        </li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
            <hr></hr>
        </>
    );
}

export default Nav;