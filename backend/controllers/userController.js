const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')
 const jwt = require('jsonwebtoken')


// create main Model
const User = db.user
 
// main work

// 1. create user

const Verify = async (req, res) => {
    const {password, Confirmpassword, email} = req.body;
     if (password && Confirmpassword && email) {

    let userExist = await User.findOne({ where: { email: email }})
          
    if (password !== Confirmpassword) {
         return res.json({ loginStatus: false, Error: "les mots de passe non conforme" });
    }else{
        if(userExist) 
        return  res.json({ loginStatus: false, Error: "Email déjà existe !" });
        else
        {
            let info = {
                email: req.body.email,
                password: req.body.password,
             }
        
            // const user = await User.create(info)
            return   res.json({ loginStatus: true });
             
        }
    }
    }
    else
    {
          res.json({ loginStatus: false, Error: "Veuillez fournir tous les champs requis" });
    }             
    
 
}


// 2. create user
const addUser = async (req, res) => {
    try {
        // Extraire les informations de la requête
        const { email, password } = req.body;

        console.log("email:", email);
        console.log("password:", password);

        // Créer un nouvel utilisateur avec les informations fournies
        let info = {
            email: email,
            password: password,
        };

        const user = await User.create(info);
        // res.status(200).send(user)
        // console.log(user)
     
        // Répondre avec un statut de réussite
        return res.json({ loginStatus: true });

    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);

        // Répondre avec un statut d'erreur
        return res.json({ loginStatus: false, error: "Erreur lors de l'ajout de l'utilisateur" });
    }
};

// 3. Login
const Login = async (req, res) => {
    try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email, password: password }})
       if(user)
       {

         const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
        res.cookie('token', token)
        return res.json({ loginStatus: true })

    }else
    {
        return res.json({ loginStatus: false, Error: "Erreur de login ou mot de passe" })
    }
    
} catch (error) {

    console.error("Erreur login:", error);
    // Répondre avec un statut d'erreur
    return res.json({ loginStatus: false, error: "Erreur login" });
   
}
};

// 4. verify email :
const VerifyEmail = async (req, res) => {
    try {
    const { email } = req.body;

    let user = await User.findOne({ where: { email: email}})
       if(user)
       { 
         return  true;
    }else
    {
         return false;
    }
    
} catch (error) {

    return res.json({ loginStatus: false, error: "Erreur email" });   
}
};
// 5 . update :

const UpdatePassword = async (req, res) => {

    let email = req.body.email;
    
    const user = await User.update(req.body, { where: { email: email }})
    if(user)
    return true;
    return false;

}
// 2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)

}

// 4. update Product

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { published: true }})

    res.status(200).send(products)

}

// 7. connect one to many relation Product and Reviews

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')









module.exports = {
    addUser,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews,
    upload,
    Verify, 
    Login,
    VerifyEmail,
    UpdatePassword
    
}