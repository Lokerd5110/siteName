const Datastore = require('nedb');
let products = new Datastore({ filename: 'datas/products.db', autoload: true });
products.ensureIndex({fieldName: 'ID', unique: true});

let productFactory = function (name, author, ID, imgName, price, availability, isHit, description, publisher, creatingDate, nOfPages, binding, restriction) {
    let product = {
        name: name,
        author: author,
        ID: ID,
        img: "/public/img/" + imgName,
        price: price + "₽",
        description: description,
        availability: availability,
        isHit: isHit,
        publisher: publisher,
        creatingDate: creatingDate,
        nOfPages: nOfPages,
        binding: binding,
        restriction: restriction
    }

    return product;
}

// let bookDesc = "«Когда роман будет закончен, я умру», — так начал известный писатель Сэмюэль Сандерсон свою книгу. Когда-то он был обычным человеком, любил свою жену Дану и дочь Мэйан и был уверен, что семья — самое ценное, что у него есть. Но слава и богатство все изменили, этого испытания Сандерсон не выдержал. Его жизнь отныне протекала в свете софитов, под щелчки фотокамер. Поклонницы считали величайшим счастьем, если он снисходил до интрижки, журналисты почитали за честь взять у него интервью. В этом угаре остановиться, подумать было немыслимо. И вот результат — он потерял все, что раньше так ценил, его жизнь оказалась под угрозой. Неужели плата за ошибки может быть столь высокой?";

// products.insert(productFactory("История моего безумия", "Тьерри Коэн", 1, "imb.png", 657, true, true, bookDesc, "Эксмо", 1983, 431, "Твёрдая", "16+"));

let createMassive = function (docs, massiveName, all) {
    docs.forEach(function(d) { 
        if(all) {
            massiveName.push(d);
        } else {
            let li = {
                name: d.name,
                author: d.author,
                price: d.price,
                img: d.img,
                id: d.ID
            }
            massiveName.push(li);
        }
    });
}

let productsList = [];
let smallList = [];
products.find({}, function(err, docs) {
    createMassive(docs, productsList, true); 
    createMassive(docs, smallList, false); 
});

let productsPopular = [];
products.find({isHit: true}, function(err, docs) {
    createMassive(docs, productsPopular, false); 
});

module.exports = {
    db: products,
    productsList: productsList,
    smallList: smallList,
    productsPopular: productsPopular
}