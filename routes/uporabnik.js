var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var http = require('http')
var app = express()
var server = http.createServer(app)


var con = mysql.createConnection({
  host: "86.61.65.175",
  user: "kolo",
  password: "loko123",
  database: "Spletne"
});


con.connect(function(err) {
if (err) throw err
});


router.get("/", function(req, res) {
  try{
      const username = req.query.username
      const password = req.query.password
      con.query(`SELECT * FROM Uporabnik WHERE Username = "${username}" AND Password = "${password}"`, function (err, result, fields) {
          if (err) throw err;
          if (result[0] == null) {
            res.json({code: 400, message: 'Ne obstaja'});
          } else {
            var rows = JSON.parse(JSON.stringify(result[0]));
            res.json(rows)
          }
            //console.log(rows.IdUporabnik);
      });
  }   catch  (err) {
      res.status(500).json(error);
  } 
});

router.post("/", function(req, res) {
  try{
      const username = req.body.username
      const password = req.body.password
      const ime = req.body.ime
      const priimek = req.body.priimek
      const email = req.body.email
      var sql = `INSERT INTO Uporabnik (Ime, Priimek, Username, Password, Email) VALUES ("${ime}","${priimek}","${username}","${password}","${email}" )`;
      con.query(sql, function (err, result) {
          if (err) throw err;
              res.json({code: 200, status: true, message: 'Uspesno vnesen'});
      });
  }   catch  (err) {
      res.status(500).json(error);
  } 
});

module.exports = router;
