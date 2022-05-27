const express = require("express");
const app = express();
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

let genres = require("./datas/genres");
let products = require("./datas/products");

app.get('/', function(req, res){
    res.render('main', {
        genres: genres.genresList, 
        popular: products.productsPopular, 
        news: products.smallList
    });
});

app.get('/cart', function(req, res){
    res.render('cart', {genres: genres.genresList});
});

app.get('/product/:id', function(req, res){
    res.render('product', {genres: genres.genresList, data: products.productsList.find(product => product.ID == req.params.id)});
});

app.listen('3000');