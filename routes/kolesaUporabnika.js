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
    con.query(`SELECT Kolo.IdUpoorabnik_FK as IdUporabnik, IdKolesa, Kolo.naziv as NazivKolesa, Opis as OpisKolesa, Slika.naziv as NazivSlike, Slika.Podatki, Kordinate.naziv as NazivKordinat, Lat, Kordinate.Longitude 
    FROM Kolo
    JOIN Slika on Slika.idSlike = Kolo.IdSlika_FK 
    JOIN Kordinate ON Kordinate.IdKordinate = Kolo.IdKordinate_fk WHERE IdUpoorabnik_FK = "${id}"`, function (err, result, fields) {
        if (err) throw err;
        if (result[0] == null) {
          res.json({code: 400, message: 'Ne obstaja'});
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

module.exports = router;

