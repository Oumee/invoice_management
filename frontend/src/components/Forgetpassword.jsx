import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Forgetpassword = () => {
      const [values, setValues] = useState({
        email: '',
     })
     const [code, setCode] = useState({
        code: '',
     })

     const navigate = useNavigate();
     
     axios.defaults.withCredentials=true;

     const [error, setError] = useState() ;
     const [error2, setError2] = useState() ;

     const OK = (event) =>{

       event.preventDefault();
       
       axios.post('http://localhost:3000/auth/forgetpassword', values)
       .then(result => 
        {
          if(result.data.loginStatus)
          {
         setError();
          }else
          {
            toast.warning(result.data.Error);

            setError(result.data.Error)
          }
        })
       .catch(err => console.log(err))
      }

      const verify = (event) =>{
       
        event.preventDefault();
       
        axios.post('http://localhost:3000/auth/verify', code)
        .then(result => 
         {
           if(result.data.loginStatus)
           {
             navigate(`/Changepassword/${values.email}`);
             console.log("here");
           }else
           {
            toast.warning(result.data.Error2);
             setError2(result.data.Error2);
           }
         })
        .catch(err => console.log(err))
      }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded border loginForm'>
       
        <h2>Envoi de code </h2>
        <form 
         onSubmit={OK} 
        >
          <div className='mb-3'>
            <label htmlFor="email">Entrer votre Email : </label>
            <input 
              type='email' 
              name='email' 
              autoComplete='off' 
              placeholder="Entrer l'email"
              className='form-control rounded' 
              onChange={(event) =>  setValues({ email : event.target.value})}
              required
            />   
          </div>
          <span className='text-danger'>{error && error}</span>

          <button className='btn btn-primary w-70 rounded mb-1'>Envoyer code</button>

         </form>

         <form 
         onSubmit={verify} 
        >
          <div className='mb-3'>
            <label htmlFor="email">Entrer le code :</label>
            <input 
              type='number' 
              name='code' 
              autoComplete='off' 
              placeholder="Entrer le code"
              className='form-control rounded' 
              onChange={(event) =>  setCode({ code : event.target.value})}  
            />   
          </div>
          <span className='text-danger'>{error2 && error2}</span>
          <button className='btn btn-success w-70 rounded mb-1'>Soumettre</button>
      
         
         </form>
      </div>
    </div>
  );
}

export default Forgetpassword;
