var express = require('express'),
app = express(),
fs = require('fs'),
path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

var send_404 = function(req,res){
        res.status(404).render('404');
}

app.get('/', function(req, res) {
  res.render('index', {});
});

app.get('/depictions/:depiction', function(req, res) {
  var id = req.params.depiction;
  var dataPath = path.join(__dirname, 'public/depictions/data', id);
  fs.lstat(path.join(dataPath, 'Info.json'), function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path.join(dataPath, 'Info.json'), 'utf8'));
        fs.lstat(path.join(dataPath, 'screenshots'), function(err, stats) {
          info['screenshots'] = (!err && stats.isDirectory());
          info['path'] = (req.url.substr(-1) != '/') ? id : '.';
          res.render('depiction', info);
        });
    } else {
      send_404(req,res);
    }
  });
});

app.get('/depictions/:depiction/screenshots/', function(req, res) {
  var id = req.params.depiction;
  var dataPath = path.join(__dirname, 'public/depictions/data', id);
  var fakePath = '/depictions/data/'+id+'/';
  fs.lstat(path.join(dataPath, 'screenshots'), function(err, stats) {
    var screenshots;
    if (!err && stats.isDirectory()) {
      screenshots = fs.readdirSync(path.join(dataPath, 'screenshots/'));
    }
    var screenies = {
      'path': path.join(fakePath, 'screenshots/'),
      'screenshots': screenshots,
    }
    res.render('screenshots', screenies);
  });
});

app.get('/depictions/:depiction/featurelist/', function(req, res) {
  var id = req.params.depiction;
  var dataPath = path.join(__dirname, 'public/depictions/data', id);
  fs.lstat(path.join(dataPath, 'Info.json'), function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path.join(dataPath, 'Info.json'), 'utf8'));
        info['root'] = (req.url.substr(-1) != '/') ? '.' : '..';
        res.render('featurelist', info);
    } else {
      send_404(req,res);
    }
  });
});

app.get('/depictions/:depiction/changelog/', function(req, res) {
  var id = req.params.depiction;
  var dataPath = path.join(__dirname, 'public/depictions/data', id);
  fs.lstat(path.join(dataPath, 'Info.json'), function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path.join(dataPath, 'Info.json'), 'utf8'));
        info['root'] = (req.url.substr(-1) != '/') ? '.' : '..';
        res.render('changelog', info);
    } else {
      send_404(req,res);
    }
  });
});

app.get('/depictions/:depiction/knownbugs/', function(req, res) {
  var id = req.params.depiction;
  var dataPath = path.join(__dirname, 'public/depictions/data', id);
  fs.lstat(path.join(dataPath, 'Info.json'), function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(path.join(dataPath, 'Info.json'), 'utf8'));
        info['root'] = (req.url.substr(-1) != '/') ? '.' : '..';
        res.render('knownbugs', info);
    } else {
      send_404(req,res);
    }
  });
});

//send 404 error for everything else
app.get('*', send_404);

app.listen(2368);
