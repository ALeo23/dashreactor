var express = require ('express');

var app = express()

app.use(express.static('../public'));

// do we need this route for index.html? I'm guessing no.
// app.get('/', function(req,res) {
//   res.render('/index.html')
// })

app.listen(process.env.PORT || 3002, function(){
  console.log('server is running')
});
