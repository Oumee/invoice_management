import express from 'express'
import con from '../utils/db.js'
 import jwt from 'jsonwebtoken'
 
 
 
 
 const router = express.Router()
 
 router.post('/changepassword', (req, res) => {
    const {password, Confirmpassword, email} = req.body;
    
    if (password && Confirmpassword && email) {
        const sql = "SELECT * FROM user WHERE email = ?";
        
        console.log(email);
        console.log(password);
        console.log(Confirmpassword);
        
        con.query(sql, [email], (err, result) => {
            if (err) return res.json({ loginStatus: false, Error: "Query error" });
            
            if (result.length > 0) {
                if (password !== Confirmpassword) {
                    return res.json({ loginStatus: false, Error: "Mot de passe invalide" });
                } else {
                    const sql1 = "UPDATE user SET password = ? WHERE email = ?";
                    
                    con.query(sql1, [password, email], (err1, result1) => {
                        if (err1) return res.json({ loginStatus: false, Error: "Update error" });
                        
                        return res.json({ loginStatus: true });
                    });
                }
            } else {
                return res.json({ loginStatus: false, Error: "Email introuvable" });
            }
        });
    } else {
        return res.json({ loginStatus: false, Error: "Veuillez fournir tous les champs requis" });
    }
});




export { router as changepassword } 

