var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
   })
   mongoose.model('User', UserSchema);
   var User = mongoose.model('User')

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err) {
      if(err) {
        console.log('something went wrong');
      } else { 
        console.log('successfully added a user!');
        res.redirect('/');
      }
    })
  })

app.listen(8000, function() {
    console.log("listening on port 8000");
})