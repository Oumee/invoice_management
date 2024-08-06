import express from 'express'
import con from '../utils/db.js'
 import jwt from 'jsonwebtoken'
 
 
 
 
 const router = express.Router()
 
router.post('/login', (req, res) => {
    const sql = "SELECT * from user where email = ? and password = ?"
    console.log(req.body.email);
    console.log(req.body.password)
     con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token)
            return res.json({ loginStatus: true })
        }else
        {
            return res.json({ loginStatus: false, Error: "Erreur de login ou mot de passe" })
        }
    })
});



export { router as adminRouter } 

