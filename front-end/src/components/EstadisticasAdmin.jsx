import React from 'react'
const EstadisticasAdmin = (props) => {
    const { idReserva, tipoVehiculo, parqueadero } = props;
    return(
        key = {idReserva},
        tipoVehiculo ={tipoVehiculo},
        parqueadero = {parqueadero}
      );
}

export default EstadisticasAdmin