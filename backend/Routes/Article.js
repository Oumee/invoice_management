import express from 'express'
import con from '../utils/db.js'
 import jwt from 'jsonwebtoken'
 import multer from 'multer'
 import path from 'path';
 import cors from 'cors';

 
 const router = express.Router()
 
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
 

// Exemple de route pour récupérer des données
router.post('/addarticle', upload.single("image"),(req, res) => {
  var image=null;   
      if(req.file)
      {
       image = req.file.filename;
      }

      console.log("jff")
      const text = req.body.text;
      const cost_price = req.body.cost_price;
      const sale_price = req.body.sale_price;
      const quantite = req.body.quantite;
      const id_category = req.body.id_category;
    
      const sql = "insert into item(text,cost_price,sale_price,quantite,category_id,image) values (?,?,?,?,?,?)"
    
     con.query(sql, [text, cost_price, sale_price, quantite, id_category, image], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
                 return res.json({ loginStatus: true });
        
    })

});

router.put('/updatecategory', upload.single("image"),(req, res) => {
  
  var image=null;  
  const name = req.body.name;
  const description = req.body.description; 
  
  if(req.file)
      {

     image = req.file.filename;
     const sql = "update category set  image = ? where id = ?";
     con.query(sql, [image, req.body.id]);
      
      }

      console.log(description)
      console.log(image)
      console.log(name)


     const sql = "update category set name = ? , description = ? where id = ?";

     con.query(sql, [name,description, req.body.id], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
          console.log("yes");
          return res.json({ loginStatus: true })
 
    })

   

 
 });

 
// suppression du catégorie : 
router.delete('/deletecategory/:id',(req, res) => {
 
  const sql = "DELETE from category where id = ?";
  const id = req.params.id;   
     con.query(sql, [id], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
 
        return res.json({ loginStatus: true })
 
    })

   

 
 });

// Exemple de route pour récupérer des données
router.get('/article', (req, res) => {
    con.query('SELECT * FROM article', (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });


// Exemple de route pour récupérer des données pour la modification du category
router.get('/datamodify/:id', (req, res) => {
  const catId = req.params.id;
  console.log(catId);

   const sql = "select * from category where id=? ";
  con.query(sql, [catId], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    console.log(results);
     return  res.json(results);
  });
});


export { router as Article } 

