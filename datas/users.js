const Datastore = require('nedb');
let users = new Datastore({ filename: 'datas/users.db', autoload: true });

let createUser = function(username, password) {
    let user = {
        username: username,
        password: password,
        liked: [],
        cart: []
    }

    users.insert(user);
}

nowUser = {

};

let findUser = function(user){
    users.findOne({username: user}, function(err, doc) {
        nowUser = doc;
    });
}

module.exports = {
    db: users,
    nowUser: nowUser,
    findUser: findUser,
    createUser: createUser
}