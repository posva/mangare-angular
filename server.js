var express = require('express');
var app = express();
var request = require('request');

var loadBase64Image = function(url, callback) {
  request({
    url: url,
    encoding: null
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var base64prefix = 'data:' + res.headers['content-type'] + ';base64,',
        image = body.toString('base64');
      if (typeof callback == 'function') {
        callback(image, base64prefix);
      }
    } else {
      throw new Error('Can not download image');
    }
  });
};

app.get('/page', function(req, res) {
  var url = req.query.url;
  console.time(url);
  loadBase64Image(url, function(image, prefix) {
    console.timeEnd(url);
    res.send(prefix+image);
  });
});

app.get('/provide', function(req, res) {
  var url = decodeURI(req.query.url);
  console.time(url);
  request({
    url: url,
    encoding: null
  }, function(err, result, body) {
    if (!err && result.statusCode == 200) {
      res.send(body);
    } else {
      throw new Error('Can not download image');
    }
  });
});

app.use(express.static('public'));

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
