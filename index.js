const express = require('express');
const env = require('dotenv').config();
//const cors = require('cors');
const app = express();
const path = require('path');
const routing = require('./backend/routes');
const bodyParser = require('body-parser')
const port = 5001;

//connexion BDD
// const BDD = require('./backend/BDD/connect');

exports.app = app;


// initialise cors
//app.use(cors());
// parse les url qui arrive de body parser

app.use(express.json()) 
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// transmet le JSON vers req.body
// accès au système de routing
app.use(routing);


// accès au build front (React)
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*",function(_, res){
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    )
});


app.listen(port, ()=> console.log(`Server Runing on port ${port}`));

module.exports = app;
