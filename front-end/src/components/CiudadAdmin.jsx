import React from 'react';

const CiudadCliente = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { nombre, imagen, idCiudad } = props

  const linkPath = `operatividad/edit/${idCiudad}`

  return (
    <>
      <div className='col'>
        <div className='card'>
          <img src={imagen} className='cad-img-top'></img>
          <div className='card-body'>
            <h5 className="card-title">{nombre}</h5>
            <a href={linkPath}><button className='btn btn-success'>Editar</button></a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CiudadCliente