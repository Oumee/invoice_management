const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Client = db.client
 
// main work

// 1. create product

const addClient = async (req, res) => {

    var image = null;
    if (req.file) {
        image = req.file.filename;
    }
    let info = {
        "name": req.body.name,
        "company_name": req.body.company_name,
        "adress": req.body.adress,
        "zip": req.body.zip,
        "city": req.body.city,
        "cin": req.body.cin,
        "patent": req.body.patent,
        "payment_terms": req.body.payment_terms,
        "image": image,

    }

    const cl = await Client.create(info)
    res.json({ loginStatus: true })


}



// 2. get all clients

const getAllClients = async (req, res) => {

    let cl = await Client.findAll({})
    res.status(200).send(cl)

}

// 3. get single client

const getClientById = async (req, res) => {

    let id = req.params.id
    let cl = await Client.findOne({ where: { id: id }})
    res.status(200).send(cl)

}

// 4. update client

const updateClient = async (req, res) => {

    var image = null;

    const id = req.body.id;
     if (req.file) {
        image = req.file.filename;
        const item = await Client.update({ image: image }, { where: { id: id } })
    }
    const item = await Client.update({ name: req.body.name,company_name: req.body.company_name,
            zip: req.body.zip, city: req.body.city, cin: req.body.cin,
            adress: req.body.adress, payment_terms: req.body.payment_terms }, { where: { id: id } })

    res.json({ loginStatus: true });

}

// 5. delete client by id

const deleteClient = async (req, res) => {

    let id = req.params.id
    
    await Client.destroy({ where: { id: id }} )

    res.json({ loginStatus: true });

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
    getAllClients,
    addClient,
    getClientById,
    updateClient,
    deleteClient
}