
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './components/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Forgetpassword from './components/Forgetpassword'
import Changepassword from './components/Changepassword'
import Conditions from './components/Conditions.jsx'
import Createaccount from './components/Createaccount.jsx'
import Verifyaccount from './components/Verifyaccount'
import Home from './components/Home'
import Categories from './components/Category/Categories'
import Produits from './components/Article/Produits.jsx'
import Clients from './components/Client/Clients'
import Profil from './components/Profil'
import Entreprises from './components/Entreprises.jsx'
import Logout from './components/Logout.jsx'
import Addcategory from './components/Category/Addcategory.jsx'
import Modifycategory from './components/Category/Modifycategory.jsx'
import 'react-toastify/dist/ReactToastify.css';
import Addarticle from './components/Article/Addarticle.jsx'
import Modifyarticle from './components/Article/Modifyarticle.jsx'
import AddClient from './components/Client/AddClient.jsx'
import ModifyClient from './components/Client/ModifyClient.jsx'
import Invoices from './components/Invoice/Invoices.jsx'
import AddInvoice from './components/Invoice/AddInvoice.jsx'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/login' element={<Login />}></Route> */}
        <Route path='/Dashboard' element={<Dashboard />}>

           <Route path='Categories' element={<Categories />}> </Route>
          <Route path='Produits' element={<Produits />}></Route>
          <Route path='Clients' element={<Clients />}></Route>
          <Route path='Invoices' element={<Invoices />}></Route>
          <Route path='Profil' element={<Profil />}></Route>
          <Route path='Entreprises' element={<Entreprises />}></Route>
          <Route path='Logout' element={<Logout />}></Route>
          <Route path='Addcategory' element={<Addcategory />}></Route>
          <Route path='Addarticle' element={<Addarticle />}></Route>
          <Route path='AddClient' element={<AddClient />}></Route>
          <Route path='AddInvoice' element={<AddInvoice />}></Route>
          <Route path='Modifycategory/:id' element={<Modifycategory />}></Route>
          <Route path='Modifyarticle/:id' element={<Modifyarticle />}></Route>
          <Route path='Modifyarticle/:id' element={<Modifyarticle />}></Route>
          <Route path='ModifyClient/:id' element={<ModifyClient />}></Route>
        
        </Route>
        <Route path='/forgetpassword' element={<Forgetpassword />}></Route>
        <Route path='/Changepassword/:email' element={<Changepassword />}></Route>
        <Route path='/conditions' element={<Conditions />}></Route>
        <Route path='/Createaccount' element={<Createaccount />}></Route>
        <Route path='/Verifyaccount/:email/:password' element={<Verifyaccount />}></Route>
        <Route path='/' element={<Login />}></Route>
 
       </Routes>
    </BrowserRouter>


  )
}

export default App
