
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg      = require('pg');
var conn = new pg.Client({
  host     : '192.168.0.177',
  port     : 5432,
  user     : 'time_market',
  password : 'neocommit',
  database : 'time_market'
});

conn.connect(err => {
    if (err) throw err;
    else {  }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.set('views','./views');
app.set('view engine','jade');
app.locals.pretty = true;
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.get('/',function(req,res){
  res.redirect('/main/shopListWait/1');
});
var router = require('./routes/route_main.js')(conn);
app.use('/main',router);
/*
var router = require('./routes/p1.js')(app);
app.use('/p1',router);

var router2 = require('./routes/p2.js');
app.use('/p2',router2);
*/

//git- test
app.listen(3000, ()=>{
  console.log('show:time admin web connect 3000!');
});
