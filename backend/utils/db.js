import mysql from 'mysql2'
 
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "factures"
})

 

con.connect(function(err) {
    if(err) {
        console.log("Y a erreur de connection");
    } else
    {
        console.log("Connected");
    }
})


export default con ;