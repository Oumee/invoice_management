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
    origin: ["http://localhost:5173"], 
    methods: ['GET', 'POST','PUT', 'DELETE'],
    credentials: true
}));

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