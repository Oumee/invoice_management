import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';





const AddClient = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [data, setData] = useState([]);

    const [client, setClient] = useState({

        name: '',
        company_name: '',
        adress: '',
        zip: '',
        city: '',
        cin: '',
        patent: '',
        payment_terms: '',
        image: ''

    });


    const handleBack = () => {
        navigate(-1); // Va à la page précédente
    };


    const handle = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('image', file);
        formData.append('name', client.name);
        formData.append('company_name', client.company_name);
        formData.append('adress', client.adress);
        formData.append('zip', client.zip);
        formData.append('cin', client.cin);
        formData.append('city', client.city);
        formData.append('patent', client.patent);
        formData.append('payment_terms', client.payment_terms);
 
        axios.post('http://localhost:3000/home/addclient', formData)

            .then(result => {
                if (result.data.loginStatus) {
                    toast.success('Client ajouté avec succès !');
                    navigate('/Dashboard/Clients');
                }
                else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            <div className="breadcrumb-header justify-content-between">
                <div className="my-auto">

                    <div className="d-flex">
                        <h4 className="content-title mb-0 my-auto">Paramètres</h4><span className="text-muted mt-1 tx-13 mr-2 mb-0">/
                            Client</span>
                    </div>
                </div>
            </div>
            <div className='row ms-2 align-item-center '>

                {/*-------------------- Ajouter ---------------------*/}
                <div  >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-content-demo d-flex justify-content-center align-items-center"  >
                            <div className="modal-header mb-3">
                                <h6 className="modal-title"> Ajout d'un client </h6>
                            </div>

                            <div className='modal-body p-4 border rounded bg-light' style={{ maxWidth: '800px', width: '100%' }} >

                                <form onSubmit={handle} encType="multipart/form-data">


                                    <div className="form-group row mb-1">
                                        <div className="col-md-6">
                                            <label htmlFor="inputName">Nom  </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                onChange={(event) => setClient({ ...client, name: event.target.value })}
                                                 
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputCompanyName">Nom de l'entreprise </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputCompanyName"
                                                onChange={(event) => setClient({ ...client, company_name: event.target.value })}
                                                 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-1">
                                        <div className="col-md-6">
                                            <label htmlFor="inputName">CIN </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                onChange={(event) => setClient({ ...client, cin: event.target.value })}
                                                 
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputCompanyName">Patent  </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputCompanyName"
                                                onChange={(event) => setClient({ ...client, patent: event.target.value })}
                                                 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-1">
                                        <div className="col-md-6">
                                            <label htmlFor="inputName">Adresse  </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                onChange={(event) => setClient({ ...client, adress: event.target.value })}
                                                 
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputCompanyName">ZIP </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputCompanyName"
                                                onChange={(event) => setClient({ ...client, zip: event.target.value })}
                                                 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-1">
                                        <div className="col-md-6">
                                            <label htmlFor="inputName"> Ville </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                onChange={(event) => setClient({ ...client, city: event.target.value })}
                                                 
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputCompanyName"> Payement </label>
                                            <select className="form-select" aria-label="Disabled select example" onChange={(event) => setClient({ ...client, payment_terms: event.target.value })}
                                                   >
                                                <option value=""  >Choisir un type</option>
                                                
                                                    <option  value="Espèces">Espèces</option>
                                                    <option  value="8 jours">8 jours</option>
                                                    <option  value="Au 1er">Au 1er</option>
                                                    <option  value="Au 1er plus un mois">Au 1er plus un mois</option>
 
                                            </select>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="code_bare"> Image </label>
                                        <input type="file" className="form-control"
                                            name='image' id='image'
                                            onChange={(event) => setFile(event.target.files[0])} />
                                    </div>

                                    <div className="modal-footer mt-3">
                                        <button type="submit" className="btn btn-success m-3"> Confirmer </button>
                                        <button type="button" className="btn btn-secondary" onClick={handleBack}> Quitter </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>


            </div >
        </>
    )
}

export default AddClient;
