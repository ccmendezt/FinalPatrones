import React from 'react'
import imagen1 from '../images/logo1.png'
import {House,PersonCircle,PersonBadge,PieChartFill,Shop} from 'react-bootstrap-icons';

function AdminNav() {
    return (
        <>
            <div className="container d-flex align-items-center justify-content-between">

                <div className="logo d-flex">

                    <h2 className='center-nav mx-3'>
                        <a className='logo-text' href="/pefilAdmin"><img src={imagen1} alt="Logo" className="img-logo"></img><span>PAR-KUD</span></a>
                    </h2>
                </div>

                <nav id="navbar" className="navbar">
                    <ul>
                        <li><a className="nav-link scrollto" href="/admin"><House></House>Administración</a></li>
                        <li><a className="nav-link scrollto" href="/reportes"><PersonBadge></PersonBadge>Reportes</a></li>
                        <li><a className="nav-link scrollto" href="/estadisticas"><PieChartFill></PieChartFill> Estadisticas</a></li>
                        <li><a className="nav-link scrollto" href="/operatividad"><Shop></Shop>Sucursales</a></li>
                        <li className="dropdown"><a className="nav-link scrollto" href="/perfilAdmin"><PersonCircle></PersonCircle>Perfil</a>
                            <ul>
                                <li><a href="/perfil">Ver perfil</a></li>
                                <li><a href="/">Salir</a></li>
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

export default AdminNav