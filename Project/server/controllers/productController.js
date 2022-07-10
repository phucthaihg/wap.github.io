const Product = require('../models/Product');

module.exports.getAllProducts = function(req, res, next){
    //request is an empty GET with url
    let database = Product.loadFromDb();
    res.send(JSON.stringify(database));
};

