import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';




const Changepassword = () => {
    const { email } = useParams();

     const [values, setValues] = useState({
      email:email,
      password: '',
      Confirmpassword: ''
   })

   const navigate = useNavigate();

   axios.defaults.withCredentials=true;

   const [error, setError] = useState() ;
    const password = (e) => {
      setValues({...values, password : e.target.value});

      const newpassword = e.target.value;
      if(newpassword.length < 4)
      setError('Voudrez au moins 4 caractères');
     else
     {
      setError();
     }
    }

  const confirmepassword = (e)=>
  {   
    setValues({...values, Confirmpassword : e.target.value});

    if(e.target.value != values.password )
      setError('mot de passe invalide');
  else 
    setError();

  }
    const OK = (event) => {

      event.preventDefault()
    
      axios.post('https://invoice-management-2-wnw6.onrender.com/auth/changepassword', values)
      .then(result => 
      {
        if(result.data.loginStatus)
        {
          navigate('/Dashboard');
        }else
        {
          toast.warning(result.data.Error);
          setError(result.data.Error);
        }
      })
     .catch(err => console.log(err));

    }

return (
  <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded border loginForm'>
     
      <h2>Changer le mot de passe</h2>
      <form 
      onSubmit={OK}
      >
      
        <div className='mb-3'>
          <label htmlFor="password">Entrer nouveau Mot de passe :</label>
          <input 
            type='password' 
            name='password' 
            autoComplete='off' 
            placeholder='Entrer le mot de passe'
            className='form-control rounded' 
            onChange={password}
            required
          />   
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Confirmer le mot de passe :</label>
          <input 
            type='password' 
            name='password' 
            autoComplete='off' 
            placeholder='Confimer le mot de passe'
            className='form-control rounded' 
            onChange={confirmepassword}
            required
          />   
        </div>
         <span className='text-danger'>{error && error}</span>
    
        <button className='btn btn-success w-100 rounded-4 mb-1'>Soumettre</button>
      
       
       </form>
       
    </div>
    
  </div>

  )
}

export default Changepassword;
