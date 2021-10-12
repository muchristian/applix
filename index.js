
const express = require('express');
var fs = require('fs');
var http = require('http');
var glob = require('glob');
const app = express();
const cookieParser = require("cookie-parser")
var language_dict = {};

glob.sync( './language/*.json' ).forEach( function( file ) {
  let dash = file.split("/");
  if(dash.length == 3) {
  	let dot = dash[2].split(".");
    if(dot.length == 2) {
      let lang = dot[0];
      fs.readFile(file, function(err, data) {
        language_dict[lang] = JSON.parse(data.toString());
      });
    }
  }
});


app.use(cookieParser());
app.use(express.static(__dirname + '/vendors/bootstrap/dist/css'));
app.use(express.static(__dirname + '/scss'));
app.use(express.static(__dirname + '/vendors/bootstrap/dist/js'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/144ppi'));
app.set('views', './')
app.set('view engine', 'ejs');

app.get('/en', (req, res) => {
  res.cookie('lang', 'en')
  res.status(200).json("well done en")
})

app.get('/fr', (req, res) => {
  res.cookie('lang', 'fr')
  res.status(200).json("well done fr")
})

app.use((req, res, next) => {
  const {cookies} = req;
  if (!('lang' in cookies)) {
    console.log('something wrong')
  }
  let lang = cookies.lang || "en"
  const data = language_dict[lang]
  req.info = data;
  next()
})

app.get('', (req, res) => {
  res.render('index', req.info)
})

app.get('/about', (req, res) => {
  res.render('about-us', req.info)
})

app.get('/health', (req, res) => {
  res.render('health-service', req.info)
})

app.get('/government', (req, res) => {
  res.render('government-service', req.info)
})

app.get('/filing', (req, res) => {
  res.render('filing-service', req.info)
})

app.get('/sport', (req, res) => {
  res.render('sport-service', req.info)
})

app.get('/banking', (req, res) => {
  res.render('banking-service', req.info)
})

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

