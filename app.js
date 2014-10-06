var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

// Heroku dynamic port (environment variable)
var herokuPort = process.env.PORT;
var server = app.listen(herokuPort, function() {
    console.log('Listening on port %d', server.address().port);
});

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello wooorld bébé!'});
})