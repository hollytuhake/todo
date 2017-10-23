var express = require('express');
var router = express.Router();
var toDoList = []; // <- Stored on the SERVER
var poolModule = require('../modules/pool.js');
var pool = poolModule;

/*
var pg = require('pg');
var config = {
    database: 'deneb', // the name of the database
    host: 'localhost', // where is your database?
    port: 5432, // the port number for you database, 5432 is the default
    max: 10, // how many connections at one time
    idleTimeoutMillis: 3000 // Close idle connections to db after
};
*/
console.log('in router');

var pool = new pg.Pool(config);

router.get('/',function(req,res){
    pool.connect(function(errorConnectingToDb, db, done){
        if(errorConnectingToDb){
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        }
        else{
            var queryText = 'SELECT * FROM "todolist" ORDER BY "importance";';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                }else{
                    res.send(result.rows);
                }
            }); //end query
        }
    }); //end pool
}) //end get route


router.post('/', function(req,res){
    var task = req.body; //the data being sent
    console.log(task);
    pool.connect(function(errorConnectingToDb, db, done){
        if (errorConnectingToDb){
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        }else{
            var queryText = 'INSERT INTO "todolist" ("importance", "task") VALUES ($1, $2);'
            db.query(queryText, [task.importance, task.task], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                }else{
                    res.sendStatus(201);
                }
            });//end query
        }
    }); //end pool
}); //end router.post

router.delete('/:id', function (req, res) {
    var taskId = req.params.id;
    console.log(taskId);
    // res.sendStatus(200);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'DELETE FROM "todolist" WHERE "id"=$1';
            db.query(queryText, [taskId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});

router.put('/:id', function (req, res) {
    var taskId = req.params.id;
    console.log(taskId);
    //res.sendStatus(200);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'UPDATE "todolist" SET "complete" = true, importance = 4 WHERE "id" = $1;';
            db.query(queryText, [taskId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});

module.exports = router;