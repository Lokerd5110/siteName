const express = require("express");
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

let genres = require("./datas/genres");
let products = require("./datas/products");
let users = require("./datas/users");
let nowUser = null;

app.get('/', function(req, res){
    res.render('main', {
        genres: genres.genresList, 
        popular: products.productsPopular, 
        news: products.smallList,
        user: nowUser
    });
});

app.get('/cart', function(req, res){
    res.render('cart', {
        genres: genres.genresList,
        user: nowUser,
        products: products.productsList
    });
});

app.get('/liked', function(req, res){
    res.render('liked', {
        genres: genres.genresList,
        user: nowUser,
        products: products.productsList
    });
});

app.get('/product/:id', function(req, res){
    res.render('product', {
        genres: genres.genresList, 
        data: products.productsList.find(product => product.ID == req.params.id),
        user: nowUser
    });
});


app.get('/catalog', function(req, res){
    res.render('catalog', {
        genres: genres.genresList, 
        news: products.smallList,
        user: nowUser
    });
});

app.get('/sign-in-page', function(req, res){
    res.render('sign-in');
});

app.post('/sign-in', urlencodedParser, function(req, res){
    let lel = users.logUser(req.body.username, req.body.password);
    lel.then(user => {
        nowUser = user;
        if (req.headers.referer != 'http://localhost:3000/sign-in-page') {
            res.redirect(req.headers.referer);
        } else {
            res.redirect('/');
        }
    }, error => {
        res.redirect('/sign-in-page');
    })
});

app.get('/add-to-cart/:id', function(req, res){
    if (nowUser != null) {
        if(nowUser.cart.indexOf(req.params.id) == -1) {
            nowUser.cart.push(req.params.id);
            users.updateUser(nowUser);
        } 
    }
    res.redirect('/cart');
});

app.get('/delete-from-cart/:id', function(req, res){
    if (nowUser != null) {
        if(nowUser.cart.indexOf(req.params.id) != -1) {
            nowUser.cart.splice(nowUser.cart.indexOf(req.params.id), 1);
            users.updateUser(nowUser);
        } 
    }
    res.redirect('/cart');
});

app.get('/add-to-liked/:id', function(req, res){
    if (nowUser != null) {
        if(nowUser.liked.indexOf(req.params.id) == -1) {
            nowUser.liked.push(req.params.id);
            users.updateUser(nowUser);
        } 
    }
    res.redirect(req.headers.referer);
});

app.get('/delete-from-liked/:id', function(req, res){
    if (nowUser != null) {
        if(nowUser.liked.indexOf(req.params.id) != -1) {
            nowUser.liked.splice(nowUser.liked.indexOf(req.params.id), 1);
            users.updateUser(nowUser);
        } 
    }
    res.redirect('/liked');
});

app.post('/sign-out', urlencodedParser, function(req, res){
    nowUser = null;
    res.redirect(req.headers.referer)
});

app.listen('3000');