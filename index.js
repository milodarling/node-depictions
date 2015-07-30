var express = require('express');
var app = express();
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

//add a trailing slash for css stuff working cause I'm a Bad Programmer™
app.use(function(req, res, next) {
   if(req.url.substr(-1) != '/')
       res.redirect(301, req.url+'/');
   else
       next();
});

app.get('/depictions/:depiction', function(req, res) {
  var id = req.params.depiction;
  var path = 'public/depictions/data/'+id+'/';
  fs.lstat(path+'Info.json', function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path+'Info.json', 'utf8'));
        fs.lstat(path+'screenshots', function(err, stats) {
          info['screenshots'] = (!err && stats.isDirectory());
          res.render('depiction', info);
        });
    }
  });
});

app.get('/depictions/:depiction/screenshots/', function(req, res) {
  var id = req.params.depiction;
  var path = 'public/depictions/data/'+id+'/';
  var fakePath = '/depictions/data/'+id+'/';
  fs.lstat(path+'screenshots', function(err, stats) {
    var screenshots;
    if (!err && stats.isDirectory()) {
      screenshots = fs.readdirSync(path+'screenshots/');
    }
    var screenies = {
      'path': fakePath+'screenshots/',
      'screenshots': screenshots
    }
    res.render('screenshots', screenies);
  });
});

app.get('/depictions/:depiction/featurelist/', function(req, res) {
  var id = req.params.depiction;
  var path = 'public/depictions/data/'+id+'/';
  fs.lstat(path+'Info.json', function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path+'Info.json', 'utf8'));
        res.render('featurelist', info);
    }
  });
});

app.get('/depictions/:depiction/changelog/', function(req, res) {
  var id = req.params.depiction;
  var path = 'public/depictions/data/'+id+'/';
  fs.lstat(path+'Info.json', function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path+'Info.json', 'utf8'));
        res.render('changelog', info);
    }
  });
});

app.get('/depictions/:depiction/knownbugs/', function(req, res) {
  var id = req.params.depiction;
  var path = 'public/depictions/data/'+id+'/';
  fs.lstat(path+'Info.json', function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path+'Info.json', 'utf8'));
        res.render('knownbugs', info);
    }
  });
});

app.listen(2368);