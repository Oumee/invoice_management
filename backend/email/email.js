


 // --------------------------
 import nodemailer from 'nodemailer';
 import { config } from 'dotenv';
 

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
const code = generateCode();
console.log(code);

const mailOptions = {
    from: {
        name: "Maroko biz it",
        address:  "kaltoumelyaqoubi@gmail.com"
    }  ,
    to: "kaltoumelyaqoubi@gmail.com", // Destinataire
    subject: "Hello ✔", // Sujet
    text: "le code est :  "+code, // Corps du message en texte brut
    html: "<b>Hello world?</b>", // Corps du message en HTML
}

const sendMail = async (transporter,mailOptions) =>{
try{
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent ! ");
}
catch (error)
{
  console.error(error);
}

}
