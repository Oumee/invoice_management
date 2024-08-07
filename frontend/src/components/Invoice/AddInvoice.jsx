import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';





const AddInvoice = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [visible, setVisible] = useState(false);
    const [rows, setRows] = useState([]);
    const [i, setI] = useState(1);
    const [newRow, setNewRow] = useState({ id:i, item_number: '', sale_price: '', quantite: '' }); // État pour le nouvel enregistrement  


    const [invoice, setInvoice] = useState({
        name: '',
        issue_date: '',
        deadline: '',
        total_ht: '',
        tva: '',
        total_ttc: '',
        status: '',
        client_id: '',


    });

    // Fonction pour ajouter une nouvelle ligne  
    const addRow = async (e) => {

        e.preventDefault(); // Empêche le rechargement de la page  

        // if ((rows.length === 0) || (newRow.item_number !== '' && newRow.sale_price !== '' && newRow.quantite !== '')) {
       
           
             await setI(x => x+1)
             console.log(i);
              await setNewRow({ id: i, item_number: '', sale_price: '', quantite: '' })
       
            setRows([...rows, newRow]); // Ajout de la nouvelle ligne à l'état  
            console.log(i);
            console.log(rows);
        // } else {
        //     toast.warning('Remplir tous les champs !');
        // }
    };

    // suppression
    const deleteItem = async (i) => {

        console.log("deleting indix",i);
        console.log("rows",rows);
        const newRows = await rows.filter(row => row.id !== i);

    setRows(newRows);

    }

    const block = (event) => {

        if (event.target.value === "")
            setVisible(false)

        else
            setVisible(true)

        setInvoice({ ...invoice, name: event.target.value })
    }

    const handleBack = () => {
        navigate(-1); // Va à la page précédente
    };


    const handleChange = (index, field, value) => {  
        const updatedRows = [...rows]; // Créez une copie de l'état actuel  
        updatedRows[index] = { ...updatedRows[index], [field]: value }; // Mettez à jour le champ spécifié  
        setRows(updatedRows); // Mettez à jour l'état  
        console.log(rows);
    };  
    
    // useeffect
    useEffect(() => {

        axios.get('https://invoice-management-2-wnw6.onrender.com/home/clients')
            .then(response => {

                setData(response.data);

            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });


        axios.get('https://invoice-management-2-wnw6.onrender.com/home/item')
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data !', error);
            });

    }, []);



    const handle = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('name', invoice.name);
        formData.append('issue_date', invoice.issue_date);
        formData.append('deadline', invoice.deadline);
        formData.append('total_ht', invoice.total_ht);
        formData.append('tva', invoice.tva);
        formData.append('total_ttc', invoice.total_ttc);
        formData.append('status', invoice.status);
        formData.append('client_id', invoice.client_id);

        axios.post('https://invoice-management-2-wnw6.onrender.com/home/addinvoice', formData)

            .then(result => {
                if (result.data.loginStatus) {
                    toast.success('Invoice ajoutée avec succès !');
                    navigate('/Dashboard/Invoices');
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
                            Facture</span>
                    </div>
                </div>
            </div>
            <div className='row ms-2 align-item-center '>

                {/*-------------------- Ajouter ---------------------*/}
                <div  >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-content-demo d-flex justify-content-center align-items-center"  >
                            <div className="modal-header mb-3">
                                <h6 className="modal-title"> Ajout d'une facture </h6>
                            </div>

                            <div className='modal-body p-4 border rounded bg-light' style={{ maxWidth: '800px', width: '100%' }} >

                                <form encType="multipart/form-data">

                                    <div className="col-md-6">
                                        <label htmlFor="inputName">Nom  </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputName"
                                            onChange={block}

                                        />
                                    </div>
                                    <div style={{ display: visible ? 'block' : 'none' }}>
                                        <div className="form-group row mb-1 ">

                                            <div className="col-md-6">
                                                <label htmlFor="inputCompanyName">Date d'émission </label>

                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="inputCompanyName"
                                                    onChange={(event) => setInvoice({ ...invoice, issue_date: event.target.value })}

                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="inputName"> Client </label>
                                                <select className="form-select" aria-label="Disabled select example" onChange={(event) => setInvoice({ ...invoice, client_id: event.target.value })} >
                                                    <option value=""  >Choisir un client</option>

                                                    {data.map((item) => (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    ))}

                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-1"    >
                                            <div className="col-md-6">
                                                <label htmlFor="inputName">Date d'échéance </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="inputName"
                                                    onChange={(event) => setInvoice({ ...invoice, deadline: event.target.value })}

                                                />
                                            </div>
                                        </div>

                                        <table className="table table-bordered m-3" id="produits">
                                            <thead>
                                                <tr>
                                                    <th> Article </th>
                                                    <th> Prix de vente </th>
                                                    <th> Quantité </th>
                                                    <th> Opération </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                
                                                    <tr key={row.id}>
                                                        <td> <select className="form-select" aria-label="Disabled select example" onChange={(event) => handleChange(index, 'item_number', event.target.value)}
                                                        >
                                                            <option value="" > Choisir un article </option>
                                                            {item.map((item) => (
                                                                <option key={item.item_number} value={item.item_number}>{item.item_text}</option>
                                                            ))}
                                                        </select></td>
                                                        <td> <input
                                                            type="text"
                                                            className="form-control"
                                                            id="item_price"
                                                            onChange={(event) => handleChange(index, 'sale_price', event.target.value)}

                                                        /></td>
                                                        <td> <input
                                                            type="number"
                                                            className="form-control"
                                                            id="quantity"
                                                            onChange={(event) => handleChange(index, 'quantite', event.target.value)}
 
                                                        /></td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                type='button'
                                                                onClick={() => {
                                                                    console.log("row.id",row.id);
                                                                    deleteItem(row.id);
                                                                    
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
                                        <button type="button" className="btn btn-primary " onClick={addRow} >Ajouter un article <i className="bi bi-plus-lg"></i></button>


                                        <div className="form-group row mb-1">
                                            <div className="col-md-6">
                                                <label htmlFor="inputCompanyName"> Total Hors taxe  </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="total_ht"
                                                    onChange={(event) => setInvoice({ ...invoice, total_ht: event.target.value })}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputName">Taxe  </label>
                                                <select className="form-select" aria-label="Disabled select example" onChange={(event) => setClient({ ...client, payment_terms: event.target.value })}
                                                >
                                                    <option value=""  >Choisir le taxe</option>

                                                    <option value="2">2%</option>
                                                    <option value="5">5%</option>
                                                    <option value="10">10%</option>

                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputCompanyName">Total avec taxe </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="total_ttc"
                                                    onChange={(event) => setInvoice({ ...invoice, total_ttc: event.target.value })}
                                                    readOnly
                                                />
                                            </div>
                                        </div>



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

export default AddInvoice;
