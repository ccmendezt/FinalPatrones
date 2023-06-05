import React, { useEffect, useState } from 'react';
import imagen from '../../../images/niceCar.jpg'
import imagenCard from '../../../images/CreditCard.jpg'
import Nav from '../../../components/PageComponents/Navbar'
import Footer from '../../../components/PageComponents/Footer'
import { CarFront, HandThumbsUpFill, Mailbox, Telephone, Person } from 'react-bootstrap-icons'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Perfil() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({});
  const [card, setCard] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = Cookies.get('idUser');
        const response = await axios.get(`${apiUrl}/users/${idUser}`);
        setUser(response.data);
        const responseCard = await axios.get(`${apiUrl}/card/id/${response.data.idTarjeta}`);
        setCard(responseCard.data.numeroTarjeta);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
                  <h3>{user.nombre} {user.apellido}</h3>
                </div>
              </div>
            </div>
            <div className='col-6 text-left container mx-5 card-body'>
              <h1 className=' mt5'>Perfil Usuario</h1>
              <hr className="mt-0 mb-4"></hr>
              <div className='row mb-5'>
                <div className='col-6'><b><Mailbox></Mailbox> Email:</b></div>
                <div className='col-6'><b>{user.email}</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b><Person></Person> Usuario:</b></div>
                <div className='col-6'><b>{user.usuario}</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b><Telephone></Telephone> Teléfono:</b></div>
                <div className='col-6'><b>+57 3555454524</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b><CarFront></CarFront> Cantidad de reservas:</b></div>
                <div className='col-6'><b>0</b></div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b><HandThumbsUpFill></HandThumbsUpFill> Cliente fiel:</b></div>
                <div className='col-6'><b>No</b></div>
              </div>
              <Link to='/perfil/editclient'>
                  <button className='btn btn-success mx-2' >Actualizar Datos</button>
              </Link>
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
                    <h6><b>Número de tarjeta:</b></h6>
                    <p className="text-muted">{card} </p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6><b>Fecha de expiración:</b></h6>
                    <p className="text-muted">08/27</p>
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6><b>CVV:</b></h6>
                    <p className="text-muted">632</p>
                  </div>
                </div>
                <hr className="mt-0 mb-4"></hr>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6><b>Propietario:</b></h6>
                    <p className="text-muted">{user.nombre} {user.apellido}</p>
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