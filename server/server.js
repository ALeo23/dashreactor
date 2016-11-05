var express = require('express');
var path = require('path');
var app = express()

//serve static files
app.use(express.static('../public'));

// do we need this route for index.html? I'm guessing no.
app.get('/', function(req,res) {
  res.render('/index')
})

app.listen(process.env.PORT || 3000, function(){
  console.log('server is running')
});

