const { resolveInclude } = require('ejs');
const Datastore = require('nedb');
let users = new Datastore({ filename: 'datas/users.db', autoload: true });

users.ensureIndex({fieldName: 'username', unique: true});

let createUser = function(username, password) {
    let user = {
        username: username,
        password: password,
        liked: [],
        cart: []
    }

    users.insert(user);
}


let logUser = function (user, password) {
    let promise = new Promise((resolve, reject) => {
        users.findOne({username: user}, function(err, doc) {
            if(doc != null) {
                if(doc.password === password) {
                    resolve(doc);
                } else {
                    reject();
                }
            } else {
                reject();
            }
            
        });
    }); 
    return promise;
}

let updateUser = function (user) {
    users.update({username: user.username}, user, {});
}

module.exports = {
    db: users,
    logUser: logUser,
    createUser: createUser,
    updateUser: updateUser
}