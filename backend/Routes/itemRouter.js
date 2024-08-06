// import controllers review, products
const itemController = require('../controllers/itemController.js')

// router
const router = require('express').Router()
const multer = require('multer');
const path = require('path');


// use routers
router.get('/item', itemController.getAllItems)
router.get('/dataitem/:id', itemController.getItemById)


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


// ajout d'un article
router.post('/addarticle', upload.single("image"),itemController.addItem);

// update
router.put('/updateitem', upload.single("image"),itemController.updateItem);

// delete 
router.delete('/deletearticle/:id',  itemController.deleteItem);
  

module.exports = router