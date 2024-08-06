const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')
 const jwt = require('jsonwebtoken')
 

// create main Model
const Category = db.Category
 
// main work

 

 
// 2. get all categories

const getAllCategories = async (req, res) => {

    let category = await Category.findAll({})
       res.json(category);
     

}
// add category
const Addcategory = async (req, res) => {
    
    var image=null;   
    if(req.file)
        {
        image = req.file.filename;
        }

    let info = {
        "name": req.body.name,
        "description": req.body.description,
        "image": image,
               }

    let category = await Category.create(info);
        if(category) return  res.json({loginStatus : true});
        return  res.json({ loginStatus: false, Error: "Query error" });

}

// 3. get single category by id 
 const getCategoryById = async (req, res) => {
    let id = req.params.id;
    let category = await Category.findOne({ where: { id: id }})
       res.json(category);
}

const updateCategory = async (req, res) => {
    var image=null;  
    const name = req.body.name;
    const description = req.body.description; 
    const id = req.body.id;

    if(req.file)
        {
            image = req.file.filename;
            const category = await Category.update({image: image }, { where: { id: id }})

        }
   
        const category = await Category.update({name: name, description: description }, { where: { id: id }})
        return res.json({ loginStatus: true });
    
 
}

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

const deleteCategory = async (req, res) => {

    let id = req.params.id
    
    await Category.destroy({ where: { id: id }} )

    res.json({ loginStatus : true })

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
    getAllCategories,
    Addcategory,
    getCategoryById,
    updateCategory,
    deleteCategory
    
}