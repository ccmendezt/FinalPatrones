import React from 'react'
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />
const ReporteParqueadero = (props) => {
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
    const apiUrl = process.env.REACT_APP_API_URL;
    const { idReserva, fechaReserva, horaInicioR, horaFinR, horaEntrada, horaSalida, tipoVehiculo, nombreUsuario, parqueadero, costo } = props
    return (
        <>
            <tr>
                <td scope="col">{idReserva}</td>
                <td scope="col">{fechaReserva}</td>
                <td scope="col">{horaInicioR}</td>
                <td scope="col">{horaFinR}</td>
                <td scope="col">{horaEntrada}</td>
                <td scope="col">{horaSalida}</td>
                <td scope="col">{tipoVehiculo}</td>
                <td scope="col">{nombreUsuario}</td>
                <td scope="col">{parqueadero}</td>
                <td scope="col">{costo}</td>

            </tr>
        </>
    );
}

export default ReporteParqueadero