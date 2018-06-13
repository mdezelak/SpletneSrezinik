var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "86.61.65.175",
  user: "kolo",
  password: "loko123",
  database: "Spletne"
});


con.connect(function(err) {
if (err) throw err
});

router.get('/:id', function(req, res) {
  try{
    const id = parseInt(req.params.id);
    console.log(id)
    con.query(`SELECT *
    FROM Izposoja
    JOIN Uporabnik on Izposoja.IdUporabnik_FK = Uporabnik.IdUporabnik
    WHERE Izposoja.IdKolesa_fk = "${id}"`, function (err, result, fields) {
        if (err) throw err;
        if (result[0] == null) {
          res.json({code: 400, message: 'Ne iposojušeš si nobenga kolesa'});
        } else {
           var rows = JSON.parse(JSON.stringify(result));
           res.json(rows)
         }
            //console.log(rows.IdUporabnik);
     });
  }   catch  (err) {
      res.status(500).json(error);
  } 
});

router.put("/", function(req, res) {
  try{
      const stanje = req.body.stanje
      const idKolesa = req.body.idkolesa
      console.log(stanje,idKolesa)
      var sql = `UPDATE Izposoja SET Izposoja.poterjeno = ${stanje}
      WHERE Izposoja.IdKolesa_fk = ${idKolesa}`;
      con.query(sql, function (err, result) {
          if (err) throw err;
              var sql = `DELETE FROM Izposoja WHERE poterjeno = 2`;
              con.query(sql, function (err, result) {
                if (err) throw err;                    
                    res.json({code: 200, status: true, message: 'Uspesno spremenjen'});
              });
      });
  }   catch  (err) {
      console.log(err);
      res.status(500).json(error);
  } 
});

module.exports = router;