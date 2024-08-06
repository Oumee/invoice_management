import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';





const Clients = () => {

    const [data, setData] = useState([]);
     let i=1;
     const navigate = useNavigate();

 // alert pop uu pour suppression
const handleDeleteWithPopup = (itemNumber) => {
    Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Cette action est irréversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            handleDelete(itemNumber);
            Swal.fire(
                'Supprimé!',
                'L\'élément a été supprimé.',
                'success'
            )
        }
    })
}

     // useeffect
    useEffect(() => {
 
        axios.get('http://localhost:3000/home/clients')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleDelete = (id) => {

    axios.delete('http://localhost:3000/home/deleteclient/'+id)
        .then( res=> {
             
            window.location.reload(); 
            toast.warning('Client supprimé avec succès !');


        })
        .catch(
            err => console.log(err)
        );
    }

    const [searchTerm, setSearchTerm] = useState('');

    // Filtrer les données en fonction du terme de recherche
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
           <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-search"></i> {/* Icône de recherche */}
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher..."
          aria-label="Rechercher"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

         <div className="breadcrumb-header justify-content-between">
    <div className="my-auto">
        <div className="d-flex align-items-center">
            <h4 className="content-title mb-0"> </h4>
            <span className="text-muted mt-1 tx-13 ml-2"> </span>
        </div>
    </div>
</div>

<div className="row">
    <div className="col-xl-12">
        <div className="card mg-b-20">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Liste des clients</h5>
                <Link className="btn btn-secondary d-flex align-items-center justify-content-center rounded-5" to="/Dashboard/AddClient">Ajouter un client</Link>
            </div>
            
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Nom de l'entreprise</th>
                                <th>Ville</th>
                                <th>Adresse</th>
                                <th>Zip</th>
                                <th>CIN</th>
                                <th>Patent</th>
                                <th>modalités de paiement</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                             
                            {filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td>{i++}</td>
                                    <td>{item.name}</td>
                                    <td>{item.company_name}</td>
                                    <td>{item.city}</td>
                                    <td>{item.adress}</td>
                                    <td>{item.zip}</td>
                                    <td>{item.cin}</td>
                                    <td>{item.patent}</td>
                                    <td>{item.payment_terms}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/images/${item.image}`}
                                            width="50"
                                            height="50"
                                            className="rounded-circle img-thumbnail"
                                            alt=""
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            className="btn btn-sm btn-info mr-1"
                                            to={`/Dashboard/ModifyClient/${item.id}`}
                                            title="Modifier"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteWithPopup(item.id)}
                                            title="Supprimer"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    </div>
</div>

        </>
    )
}

export default Clients;