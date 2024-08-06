// import controllers review, products
const categoryController = require('../controllers/categoryController.js')
 

// router
const router = require('express').Router()
const multer = require('multer');
const path = require('path');


// use routers
router.get('/category', categoryController.getAllCategories)

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

// Exemple de route pour  ajouter catégorie
router.post('/addcategory', upload.single("image"),categoryController.Addcategory); 


// get category by id 
 
router.get('/datamodify/:id',  categoryController.getCategoryById);
 

// update
router.put('/updatecategory', upload.single("image"),categoryController.updateCategory);
  
 
// suppression du catégorie : 
router.delete('/deletecategory/:id', categoryController.deleteCategory);


 
module.exports = router