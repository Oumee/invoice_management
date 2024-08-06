const express = require('express');
// const con = require('../utils/db.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('dotenv');
const userController = require('../controllers/userController.js')
// import controllers  user



// router
const router = require('express').Router()


// Utilisation d'express.Router pour définir les routes
// const router = express.Router();

// Code pour utiliser les modules importés ici...



config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "kaltoumelyaqoubi@gmail.com",
    pass: "dsffrzdwjxmzihji",
  },
});

function generateCode() {

  return Math.floor(1000 + Math.random() * 9000).toString(); // Génère un code entre 1000 et 9999
}

let code;


const mailOptions = (code, email) => {
  return {
    from: {
      name: "Maroko biz it",
      address: "kaltoumelyaqoubi@gmail.com",
    },
    to: email, // Destinataire
    subject: "Bonjour,  ", // Sujet
    html: "<b>votre code est : " + code + "</b>", // Corps du message en HTML

  }
}

const sendMail = async (transporter, mailOptions, code, email) => {
  try {
    await transporter.sendMail(mailOptions(code, email));
    console.log("Email has been sent ! " + code);
  }
  catch (error) {
    console.error(error);
    return res.json({ loginStatus: false, Error: "Email non exist !" });

  }
}


// Mail Forget Password
router.post('/forgetpassword', async (req, res) => {
  try {
    const status = await userController.VerifyEmail(req, res);

    if (status == true) {
      code = generateCode();
      console.log(code);
      await sendMail(transporter, mailOptions, code, req.body.email);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Email n'existe pas !" });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    return res.json({ loginStatus: false, Error: error.message });
  }

});

// envoi de code pour inscription : 
router.post('/sendcode', (req, res) => {

  // --- Y A ---  
  code = generateCode();
  console.log(code);

  sendMail(transporter, mailOptions, code, req.body.email);

  return res.json({ loginStatus: true })

});

router.post('/createaccount', (req, res) => {
  console.log(code);
  email = req.body.email;
  password = req.body.password;
  console.log(email)
  console.log(password)

  if (req.body.code == code) {
    console.log(code);
    userController.addUser(req, res)
      .then(() => {
        return res.json({ loginStatus: true });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        return res.json({ loginStatus: false, Error2: error });
      });

  } else {
    return res.json({ loginStatus: false, Error2: "Code incorrecte" })
  }
});

router.post('/verify', (req, res) => {

  console.log("le code est", code);
  console.log("le t", req.body.code);
  if (req.body.code == code) {

    return res.json({ loginStatus: true })
  } else {
    return res.json({ loginStatus: false, Error2: "Code incorrecte" })
  }
});

router.post('/changepassword', async (req, res) => {

  const { email, password, Confirmpassword } = req.body;

  if (password && Confirmpassword && email) {
    if (password.length < 4) {
      return res.json({ loginStatus: false, Error: "Faut au moins 4 caractères !" });
    }
    else {
      const status = await userController.VerifyEmail(req, res);

      if (status == true) {
        console.log("email", email);
        console.log("pass", password);
        console.log("conspass", Confirmpassword);

        if (password !== Confirmpassword) {
          return res.json({ loginStatus: false, Error: "Mot de passe invalide" });
        } else {

          const s = await userController.UpdatePassword(req, res);

          if (s == true) {
            return res.json({ loginStatus: true });
          }
          else {
            return res.json({ loginStatus: false, Error: "Error query" });
          }
        }
      } else {
        return res.json({ loginStatus: false, Error: "Email introuvable" });
      }
    }
    }else
    {
      return res.json({ loginStatus: false, Error: "Veuillez fournir tous les champs requis !" });

    }

  });


module.exports = router; // Exporter le routeur pour l'utiliser dans d'autres fichiers
