var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// if no host, use local 5000
var port = process.env.PORT || 5000;

console.log('connected to server');

// make installed apps ready to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// point to router
var listRouter = require('./routes/list.js');
app.use('/list', listRouter);
//app.use(app.router);
//listRouter.initialize(app);

// determine port to use
app.listen(port, function () {
    console.log('listening on port', port);
});
