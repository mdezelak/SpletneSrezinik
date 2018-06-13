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

router.post("/", function(req, res) {
    try{
        const iduporabnika = req.body.iduporabnika;
        const nazivkolesa = req.body.nazivkolesa;
        const opiskolesa = req.body.opiskolesa;
        const nazivslike = req.body.nazivslike;
        const slikadata = req.body.slikadata;
        const nazivlokacije = req.body.nazivlokacije;
        const latitude = req.body.latitude;
        const long = req.body.long;

        var sql = `INSERT INTO Slika (naziv, Podatki) VALUES ("${nazivslike}","${slikadata}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            else {
                //console.log("dela1")
                console.log(result.insertId)   
                var sql = `SELECT LAST_INSERT_ID()`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    else {      
                        console.log(result.insertId)             
                        var idSlike = JSON.parse(JSON.stringify(result[0]));
                        var sql = `INSERT INTO Kordinate (naziv, Lat, Longitude) VALUES ("${nazivlokacije}","${latitude}", "${long}")`;
                        con.query(sql, function (err, result) {
                        if (err) throw err;
                        else { 
                            var sql = `SELECT LAST_INSERT_ID()`;
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                else {
                                    console.log("dela3")
                                    var idKordinate = JSON.parse(JSON.stringify(result[0]));
                                    var sql = `INSERT INTO Kolo (IdUpoorabnik_FK, naziv, opis, IdKordinate_fk, IdSlika_FK) VALUES ("${iduporabnika}","${nazivkolesa}", "${opiskolesa}", "${idKordinate['LAST_INSERT_ID()']}", "${idSlike['LAST_INSERT_ID()']}" )`;
                                    con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    else {
                                        res.json({code: 200, status: true, message: 'Uspesno vnesen'});
                                    }});
                                }});
                        }});
               }});
            }               
        });
    }   catch  (err) {
        res.status(500).json(error);
    } 
  });

router.delete("/:id", function(req, res) {
    try{
        const idKolesa = parseInt(req.params.id);
        //console.log(idKolesa);      
        var sql = `SELECT IdKordinate_fk, IdSlika_FK FROM Kolo WHERE IdKolesa = "${idKolesa}"`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(JSON.parse(result[0]));
                throw err;         
            }
            if (result == null) {
                res.json({code: 400, message: 'Kolo ne obstaja'});
              } else {
                console.log(result);
                var fkKordinat = JSON.parse(JSON.stringify(result[0]['IdKordinate_fk']));               
                var fkSlike = JSON.parse(JSON.stringify(result[0]['IdSlika_FK']));
                
                console.log(fkKordinat);
                console.log(fkSlike);

                var sql = `DELETE FROM Kolo WHERE idKolesa = "${idKolesa}"`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    else {
                        var sql = `DELETE FROM Slika WHERE idSlike = "${fkSlike}"`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            else {
                                var sql = `DELETE FROM Kordinate WHERE IdKordinate = "${fkKordinat}"`;
                                con.query(sql, function (err, result) {
                                if (err) throw err;
                                else {
                                    res.json({code: 200, status: true, message: 'Uspesno odstranjeno'});
                                }});                       
                            }});
                    }});
              }
            });             
    }   catch  (err) {
        res.status(500).json(error);
    } 
  });

module.exports = router