import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';





const Addarticle = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [data, setData] = useState([]);

    const [article, setArticle] = useState({
        text: '',
        id_category:'',
        cost_price: '',
        sale_price: '',
        quantite: '',
        image: ''
    });

    useEffect(() => {

        axios.get('http://localhost:3000/home/category')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleBack = () => {
        navigate(-1); // Va à la page précédente
    };


    const handle = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('image', file);
        formData.append('item_text', article.text);
        formData.append('category_id', article.id_category);
        formData.append('cost_price', article.cost_price);
        formData.append('sale_price', article.sale_price);
        formData.append('quantite', article.quantite);
        console.log(article.id_category);


        axios.post('http://localhost:3000/home/addarticle', formData)

            .then(result => {
                if (result.data.loginStatus) {
                    toast.success('Article ajouté avec succès !');
                    navigate('/Dashboard/Produits');
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
                            Articles</span>
                    </div>
                </div>
            </div>
            <div className='row ms-2 align-item-center '>

                {/*-------------------- Ajouter ---------------------*/}
                <div  >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-content-demo d-flex justify-content-center align-items-center"  >
                            <div className="modal-header mb-3">
                                <h6 className="modal-title"> Ajout d'un article </h6>
                            </div>

                            <div className='modal-body p-4 border rounded bg-light' style={{ maxWidth: '800px', width: '100%' }} >

                                <form onSubmit={handle} encType="multipart/form-data">


                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Nom de l'article <span className="required" style={{ color: 'red' }}>*</span></label>
                                        <input type="text" className="form-control"
                                            onChange={(event) => setArticle({ ...article, text: event.target.value })}
                                            required />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> catégorie <span className="required" style={{ color: 'red' }}>*</span></label>
                                        <select className="form-select" aria-label="Disabled select example"   onChange={(event) => setArticle({...article, id_category: event.target.value})}
                                         required  >
                                            <option    value=""  >Choisir une catégorie</option>
                                            {data.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                               
                                            ))}
                           
                                        </select>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Prix d'achat <span className="required" style={{ color: 'red' }}>*</span></label>
                                        <input type="text" className="form-control"
                                            onChange={(event) => setArticle({ ...article, cost_price: event.target.value })}
                                             required />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Prix de vente  </label>
                                        <input type="number" className="form-control"
                                            onChange={(event) => setArticle({ ...article, sale_price: event.target.value })}
                                              />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Quantité  </label>
                                        <input type="number" className="form-control"
                                            onChange={(event) => setArticle({ ...article, quantite: event.target.value })}
                                              />
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

export default Addarticle;