var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

app.listen(8080, () => {
    console.log("Server funcionando");
})