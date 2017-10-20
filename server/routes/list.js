var express = require('express');
var router = express.Router();
var toDoList = []; // <- Stored on the SERVER

var pg = require('pg');
var config = {
    database: 'deneb', // the name of the database
    host: 'localhost', // where is your database?
    port: 5432, // the port number for you database, 5432 is the default
    max: 10, // how many connections at one time
    idleTimeoutMillis: 3000 // Close idle connections to db after
};

var pool = new pg.Pool(config);