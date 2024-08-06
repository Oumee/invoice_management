import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';



const Createaccount = () => {
 
     const [values, setValues] = useState({
      email:'',
      password: '',
      Confirmpassword: ''
   })

   const navigate = useNavigate();

   axios.defaults.withCredentials=true;

   const [error, setError] = useState() ;
    const password = (e) => {
      const newpassword = e.target.value;
      if(newpassword.length < 4)
      {setError('Voudrez au moins 4 caractères');
 

    }else
     {
      setValues({...values, password : e.target.value});
      setError();

     }
    }

  const confirmepassword = (e)=>{
       
    if(e.target.value != values.password )
      setError('mot de passe invalide');
     else
     { 
    setError();
    setValues({...values, Confirmpassword : e.target.value});
     }
  }
   const OK = (event) => {

     event.preventDefault();
    
     axios.post('http://localhost:3000/auth/inscrire', values)
     .then(result => 
      {
        if(result.data.loginStatus)
        {
            navigate(`/Verifyaccount/${values.email}/${values.password}`);
        }
        else
        {
          setError(result.data.Error);
          toast.warning(result.data.Error);

        }
      })
     .catch(err => console.log(err));

    }

return (
  <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded border loginForm'>
     
      <h2>Inscription</h2>
      <form 
      onSubmit={OK}
      >
        <div className='mb-3'>
          <label htmlFor="email">Entrer l'email :</label>
          <input 
            type='email' 
            name='email' 
            autoComplete='off' 
            placeholder="Entrer l'email"
            className='form-control rounded' 
            onChange={(event) =>  setValues({...values, email : event.target.value})}
            required
          />   
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Entrer le mot de passe :</label>
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
       <a href='/forgetpassword' style={{ textDecoration: 'none',  color: 'white'  }} className='' >mot de passe oublié ?</a>
       
    </div>
    
  </div>

  )
}

export default Createaccount;
