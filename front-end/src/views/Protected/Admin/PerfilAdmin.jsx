import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/PageComponents/AdminNav'
import Footer from '../../../components/PageComponents/Footer'
import imagen from '../../../images/niceCar.jpg'
import { Mailbox, Person } from 'react-bootstrap-icons'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Link } from 'react-router-dom';

function PerfilAdmin() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = Cookies.get('idUser');
        const response = await axios.get(`${apiUrl}/users/${idUser}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
                  <h3>{user.nombre} {user.apellido}</h3>
                </div>
              </div>
            </div>
            <div className='col-6 text-left container mx-5 card-body'>
              <h1 className=' mt5'>Perfil Administrador</h1>
              <hr className="mt-0 mb-4"></hr>
              <div className='row mb-5'>
                <div className='col-6'><b><Mailbox></Mailbox> Email:</b></div>
                <div className='col-6'>{user.email}</div>
              </div>
              <div className='row mb-5'>
                <div className='col-6'><b><Person></Person> Usuario:</b></div>
                <div className='col-6'>{user.usuario}</div>
              </div>
              <div className='row mb-5'>
                <Link to='/perfil/edit'>
                  <button className='btn btn-success mx-2' >Actualizar Datos</button>
                </Link>
              </div>
              {/* {
                (user.idTarjeta != null) ? (
                  <div className='row mb-5'>
                    <div className='col-6'><b><PersonVcard></PersonVcard> Tarjeta:</b></div>
                    <div className='col-6'><b>{user.idTarjeta}</b></div>
                  </div>) : (<div></div>)
              } */}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
    </>
  )
}

export default PerfilAdmin