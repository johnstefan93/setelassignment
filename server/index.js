const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    connectionLimit: 10,
    database: 'seteldb'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT name, price, status, DATE_FORMAT(created, \"%M %d %Y\") as formatcreated, DATE_FORMAT(updated, \"%M %d %Y\") as formatupdated from seteldb.setelusers"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => {
    const name = req.body.name
    const price = req.body.price
    const status = req.body.status

    const sqlInsert = "INSERT INTO setelusers (name, price, status, created, updated) VALUES (?,?,?,now(),now())"
    db.query(sqlInsert, [name, price, status], (err, result) => {
        console.log(err);
    })
})

app.put("/api/cancel", (req, res) => {
    const name = req.body.name
    const sqlUpdate = "UPDATE setelusers SET status = 'Cancelled', updated = now() WHERE name = ?";
    db.query(sqlUpdate, [name], (err, result) => {
        console.log(result)
    })
})

app.delete("/api/delete/:name", (req, res) => {
    const name = req.params.name
    const sqlDelete = "DELETE FROM setelusers WHERE name = ?";
    db.query(sqlDelete, name, (err, result) => {
       if (err) console.log(err)
    })
})

app.put("/api/update", (req, res) => {
    const name = req.body.name
    const status = req.body.status
    const sqlUpdate = "UPDATE setelusers SET status = ?, updated = now() WHERE name = ?";
    db.query(sqlUpdate, [status, name], (err, result) => {
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log('run on port 3001');
});