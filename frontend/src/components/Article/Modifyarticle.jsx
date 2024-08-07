import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';





const Modifyarticle = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [data, setData] = useState([]);

    const [article, setArticle] = useState({
        item_text: '',
        category_id:'',
        cost_price: '',
        sale_price: '',
        quantite: '',
        image: ''
    });

    useEffect(() => {

        axios.get('https://invoice-management-2-wnw6.onrender.com/home/category')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });


            axios.get('https://invoice-management-2-wnw6.onrender.com/home/dataitem/'+id)
            .then(response => {
    
              setArticle( response.data);
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
        formData.append('id', id);
        formData.append('image', file);
        formData.append('item_text', article.item_text);
        formData.append('category_id', article.category_id);
        formData.append('cost_price', article.cost_price);
        formData.append('sale_price', article.sale_price);
        formData.append('quantite', article.quantite);
        console.log(article.id_category);


        axios.put('https://invoice-management-2-wnw6.onrender.com/home/updateitem', formData)

            .then(result => {
                if (result.data.loginStatus) {
                    toast.success('Article modifié avec succès !');
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
                                            value={article.item_text}
                                            onChange={(event) => setArticle({ ...article, item_text: event.target.value })}
                                            required />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> catégorie <span className="required" style={{ color: 'red' }}>*</span></label>
                                        <select className="form-select" aria-label="Disabled select example"   onChange={(event) => setArticle({...article, category_id: event.target.value})} >
                                            <option   > {article.category ? article.category.name : 'no category'}</option>
                                            {data.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                               
                                            ))}

                           
                                        </select>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Prix d'achat <span className="required" style={{ color: 'red' }}>*</span></label>
                                        <input type="text" className="form-control"
                                            value={article.cost_price}
                                            onChange={(event) => setArticle({ ...article, cost_price: event.target.value })}
                                             required />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Prix de vente  </label>
                                        <input type="number" className="form-control"
                                            value={article.sale_price}
                                            onChange={(event) => setArticle({ ...article, sale_price: event.target.value })}
                                              />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Quantité  </label>
                                        <input type="number" className="form-control"
                                            value={article.quantite}
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

export default Modifyarticle;
