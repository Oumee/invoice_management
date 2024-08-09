const  User = require('./Routes/userRouter.js');
const Verify = require('./Routes/Verify.js');
const Category = require('./Routes/categoryRouter.js');
const Item = require('./Routes/itemRouter.js');
const Client = require('./Routes/clientRouter.js');
const express = require('express')
const cors = require('cors')



// application
const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173", // for local development
            //  "https://66b37d654d83b2113aa912ad--marokkobizitinvoicedev.netlify.app",
             "https://marokkobizinvoice.com", // your Netlify domain
           
            ], 
    methods: ['GET', 'POST','PUT', 'DELETE'],
    credentials: true
}));

// app.use(cors({
//     origin: '*', // Permet toutes les origines (pas recommandé pour la production)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: false
// }));


app.use(express.static("public"))

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// routers

app.use('/auth', User)
app.use('/auth', Verify)
app.use('/home', Category)
app.use('/home', Item)
app.use('/home', Client)


//static Images Folder


//port

const PORT = process.env.PORT || 3000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})