import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';





const Modifycategory = () => {
    
    const {id} = useParams(); 
    const navigate = useNavigate();
    const [file, setFile] = useState();
 

    const [values, setValues] = useState({
        id: id,
        name: '',
        description: ''
    });
 
    useEffect(() => {
        axios.get('https://invoice-management-2-wnw6.onrender.com/home/datamodify/'+id)
        .then(response => {

          setValues({...values, name: response.data.name, description:response.data.description, image: response.data.image });
          
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
      }, []);


    const handleBack = () => {
    navigate(-1); // Va à la page précédente
    };


    const handle = (event) =>{
        
        event.preventDefault();
        const formData = new FormData()
        formData.append('image', file);
        formData.append('name', values.name);
        formData.append('description',values.description);
        formData.append('id',values.id);

        axios.put('https://invoice-management-2-wnw6.onrender.com/home/updatecategory', formData)
        .then(result => 
         {
           if(result.data.loginStatus)
           {
             toast.success('Catégorie modifiée avec succès !');
             navigate('/Dashboard/Categories');

           }
           else
           {
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
                            Catégories</span>
                    </div>
                </div>
            </div>
            <div className='row ms-2 align-item-center '>

                {/*-------------------- Modifier ---------------------*/}
                <div  >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-content-demo d-flex justify-content-center align-items-center"  >
                            <div className="modal-header mb-3">
                                <h6 className="modal-title"> Modification d'une catégorie </h6>
                            </div>

                            <div className='modal-body p-4 border rounded bg-light' style={{ maxWidth: '800px', width: '100%' }} >
                            
                                <form onSubmit={handle}  encType="multipart/form-data">


                                    <div className = "form-group mb-1">
                                        <label htmlFor="exampleInputEmail1"> Nom de la catégorie <span className="required" style={{color: 'red'}}>*</span></label>
                                        <input type="text" className="form-control" 
                                        value={values.name}
                                        onChange={(event) =>  setValues({...values, name: event.target.value})}
                                        required />
                                    </div>

                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleFormControlTextarea1"> Description </label>
                                        <textarea className="form-control"   rows="3"
                                        value={values.description}
                                        onChange={(event) =>  setValues({...values, description : event.target.value})}
                                        ></textarea>
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

export default Modifycategory;
