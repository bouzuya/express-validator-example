var express = require('express');
var expressValidator = require('express-validator');

var app = module.exports = express();

app.configure(function() {
  app.use(express.json());
  app.use(expressValidator());
});

app.get('/', function(req, res) {
  res.send('Hello');
});

app.post('/users/create', function(req, res) {
  req.validate('name', 'name can\'t be empty.').notEmpty();
  req.validate('birthday', 'birthday is not date.').isDate();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors[0].msg);
    return;
  }
  var name = req.param('name');
  res.send(name);
});

app.listen(3000);

