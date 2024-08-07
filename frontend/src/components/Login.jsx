import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Login = () => {
      const [values, setValues] = useState({
        email: '',
        password: ''
     })

     const navigate = useNavigate();
     axios.defaults.withCredentials=true;
     const [error, setError] = useState() ;

     const OK = (event) =>{
       event.preventDefault()
       axios.post('https://invoice-management-2-wnw6.onrender.com/auth/login', values)
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
       .catch(err => console.log(err))
      }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 flex-column loginPage'>
      <div className='p-3 rounded border loginForm '>
       
        <h2>Authentification</h2>
        <form 
        onSubmit={OK}
        >
          <div className='mb-3'>
            <label htmlFor="email">Email :</label>
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
            <label htmlFor="password">Mot de passe :</label>
            <input 
              type='password' 
              name='password' 
              autoComplete='off' 
              placeholder='Entrer le mot de passe'
              className='form-control rounded' 
              onChange={(event) =>  setValues({...values, password : event.target.value})}
              required
            />   
          </div>
         
           <span className='text-danger'>{error && error}</span>
      
          <button className='btn btn-success w-100 rounded mb-1'>Se connecter</button>
        
          <div className='mb-2'>
              <input type='checkbox' name='ticket' id='ticket' className='me-2 custom-checkbox' required/>
              <label htmlFor='password' required ><a href='/conditions' className='condition'>Vous êtes en accords avec les conditions ?</a></label>
          </div>
            <a href='/forgetpassword' style={{ textDecoration: 'none',  color: 'white'  }} className='' >mot de passe oublié ?</a>
        </form>
         
      </div>
       <div className='p-3 rounded link'>
        <span className=''> ----------- Vous n'avez pas de compte ? ----------- </span>
        <br />
        <Link to="/Createaccount" className='link'>S'inscrire</Link>
      </div>
    </div>
  );
}

export default Login;
