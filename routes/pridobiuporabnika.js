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


router.get("/:id", function(req, res) {
  try{
    const id = parseInt(req.params.id);
      con.query(`SELECT * FROM Uporabnik WHERE IdUporabnik = "${id}"`, function (err, result, fields) {
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

module.exports = router;
