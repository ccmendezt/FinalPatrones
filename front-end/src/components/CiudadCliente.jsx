import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


const CiudadCliente = (props) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { nombre, imagen, idCiudad } = props

    const linkPath = `/ciudades/${idCiudad}`

    return (
        <>  
            <div className='col'>
                <div className='card'>
                    <img src={imagen} className='cad-img-top'></img>
                    <div className='card-body'>
                        <h5 className="card-title">{nombre}</h5>
                        <a href={linkPath}><button className='btn btn-success'>Ver sucursales</button></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CiudadCliente