import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  return (
    <div className="container-fluid ">
    <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <Link to="/Dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
            <span className="fs-5 fw-bolder d-none d-sm-inline">
                Marokko Biz It
              </span></Link>
            <ul  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
              <li  className="w-100 ">
                <Link to="/Dashboard" className="nav-link text-white px-0 align-middle">
                <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span></Link>
              </li>
              <li className="w-100 ">
                
                <Link to="Invoices" 
                className="nav-link px-0 align-middle text-white w-40">
                <i className="bi bi-receipt-cutoff ms-2 fs-4 "></i>
                  <span className="ms-2 d-none d-sm-inline ">
                    Factures
                  </span></Link>
                
              </li>
              <li className='w-100'>
                <Link to="Categories"
               className="nav-link px-0 align-middle text-white "
               >
                    <i className="bi bi-tags fs-5 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Catégories
                  </span></Link>
              </li>
              <li className='w-100'>
                <Link to="Produits"
                className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi bi-diagram-2 ms-1 fs-2"></i>
                  <span className=" d-none d-sm-inline ms-2 fs-6">
                    Articles
                  </span></Link>
              </li>
              <li className='w-100'>
                <Link to="Clients"
                className="nav-link px-0 align-middle text-white">
                <i className="fs-4 bi-people ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">
                    Clients
                  </span></Link>
              </li>
              <li className='w-100'>
                <Link to="Profil"
                className="nav-link px-0 align-middle text-white">
                 <i className="bi bi-person-square fs-4 ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">
                    Profil
                  </span></Link>
              </li>
              <li className='w-100'>
                <Link to="Entreprises"
                className="nav-link px-0 align-middle text-white">
                <i className="bi bi-buildings ms-2 fs-5"></i>
                 <span className="ms-2 d-none d-sm-inline">
                    Entreprises
                  </span></Link>
              </li>
              <li className='w-100'>
                <Link to="Logout"
                className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-1"></i>
                 <span className="ms-2 d-none d-sm-inline ">
                    Se déconnecter
                  </span></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>   Marokko Biz It </h4>
          </div>
          <Outlet />
       

        </div>
       </div>
    </div>
  )
}

export default Dashboard;
