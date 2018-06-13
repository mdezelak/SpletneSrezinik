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
    con.query(`SELECT Kolo.IdUpoorabnik_FK as IdLastnikKolesa, IdKolesa, Kolo.naziv as NazivKolesa, Opis as OpisKolesa, Slika.naziv as NazivSlike, Slika.Podatki, Kordinate.naziv as NazivKordinat, Lat, Kordinate.Longitude 
    FROM Kolo
    JOIN Slika on Slika.idSlike = Kolo.IdSlika_FK 
    JOIN Kordinate ON Kordinate.IdKordinate = Kolo.IdKordinate_fk
    LEFT JOIN Izposoja ON Izposoja.IdKolesa_fk = Kolo.IdKolesa 
    WHERE IdUpoorabnik_FK != "${id}" AND Izposoja.idIzposoje IS NULL`, function (err, result, fields) {
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

router.post('/', function(req, res) {
  try{
    const iduporabnika = req.body.iduporabnika;
    const idkolesa = req.body.idkolesa;
    const konecizposoje = req.body.konecizposoje;

    var sql = `INSERT INTO Izposoja (IdUporabnik_FK, IdKolesa_fk, zacetekIzposoje, konecIzposoje) VALUES ("${iduporabnika}","${idkolesa}", "${new Date().toLocaleString()}", "${konecizposoje}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        else {
          res.json({code: 200, status: true, message: 'Uspesno vnesen'});                  
        }               
    });
}   catch  (err) {
    res.status(500).json(error);
} 
});

module.exports = router;

