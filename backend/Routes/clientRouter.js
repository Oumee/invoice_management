// import controllers review, products
const clientController = require('../controllers/clientController.js')
 
// router
const router = require('express').Router()
const multer = require('multer');
const path = require('path');



// Configuration de multer pour stocker les fichiers dans le dossier 'Images'
const storage = multer.diskStorage({
    destination: (req, file, db) => {
    db(null, 'public/images');
    },
    filename: (req, file , db) => {
    db(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({storage: storage});



// use routers
router.post('/addclient', upload.single("image"),  clientController.addClient)

router.get('/clients', clientController.getAllClients)

router.get('/client/:id', clientController.getClientById)

router.put('/updateclient', upload.single("image"), clientController.updateClient)

router.delete('/deleteclient/:id',clientController.deleteClient)


// // Review Url and Controller

// router.get('/allReviews', reviewController.getAllReviews)
// router.post('/addReview/:id', reviewController.addReview)

// // get product Reviews
// router.get('/getProductReviews/:id', productController.getProductReviews)




// // Products router
// router.get('/:id', productController.getOneProduct)


// router.delete('/:id', productController.deleteProduct)

module.exports = router