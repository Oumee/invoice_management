import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';





const Produits = () => {

    const [data, setData] = useState([]);
    let i = 1;
    // navigation
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
                // Swal.fire(
                //     'Supprimé!',
                //     'L\'élément a été supprimé.',
                //     'success'
                // )
            }
        })
    }

    // 
    useEffect(() => {

        axios.get('https://invoice-management-2-wnw6.onrender.com/home/item')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data !', error);
            });
    }, []);

    const handleDelete = (id) => {

        axios.delete('https://invoice-management-2-wnw6.onrender.com/home/deletearticle/' + id)
            .then(res => {
                 window.location.reload(); 
                toast.warning('article supprimé avec succès !');

            })
            .catch(
                err => console.log(err)
            );
    }

    const [searchTerm, setSearchTerm] = useState('');

    // Filtrer les données en fonction du terme de recherche
    const filteredData = data.filter(item =>
        item.item_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cost_price.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <h5 className="card-title mb-0">Liste des articles</h5>
                            <Link className="btn btn-secondary d-flex align-items-center justify-content-center" to="/Dashboard/Addarticle">Ajouter un article</Link>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-bordered text-center">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Nom d'article</th>
                                            <th>Catégorie</th>
                                            <th>Prix d'achat</th>
                                            <th>Prix de vente</th>
                                            <th>Quantité</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {filteredData.map((item) => (
                                            <tr key={item.item_number}>
                                                <td>{i++}</td>
                                                <td>{item.item_text}</td>
                                                <td>{item.category && item.category.name ? item.category.name : 'No Category'}</td>
                                                <td>{item.cost_price}</td>
                                                <td>{item.sale_price}</td>
                                                <td>{item.quantite}</td>
                                                <td>
                                                    <img
                                                        src={`https://invoice-management-2-wnw6.onrender.com/images/${item.image}`}
                                                        width="50"
                                                        height="50"
                                                        className="rounded-circle img-thumbnail"
                                                        alt=""
                                                    />
                                                </td>
                                                <td>
                                                    <Link
                                                        className="btn btn-sm btn-info mr-1"
                                                        to={`/Dashboard/Modifyarticle/${item.item_number}`}
                                                        title="Modifier"
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => {
                                                                 handleDeleteWithPopup(item.item_number);
                                                           
                                                        }}
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

export default Produits
