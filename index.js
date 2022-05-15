let express = require("express");
let app = express();

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('main');
});

app.get('/cart', function(req, res){
    res.render('cart');
});

app.get('/product', function(req, res){
    res.render('product');
});

app.listen('3000');