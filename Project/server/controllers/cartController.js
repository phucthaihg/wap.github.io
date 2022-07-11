const Cart = require('../models/Cart');

module.exports.getCartByUsername = function(req, res, next){
    let result = {};

    let username = req.params.accessToken.split("-")[0];
    if(!username) {
        result.error = "username not found";
    }else{
        result = Cart.getCartByUsername(username);
    }

    res.send(JSON.stringify(result));
};

module.exports.updateItemQuantity = function(req, res, next){

    let result = {};

    let username = req.body.accessToken.split("-")[0];
    let item = req.body.item;

    if(!username || !item) {
        result.error = "username not found or items not found"
    }else{
        // let obj = Cart.getCartByUsername(username);
        // let cart;
        // if(!obj){
        //     cart = new Cart(username, []);
        // }else{
        //     cart = new Cart(obj.username, obj.items);
        // }

        result = Cart.updateItemQuantity(username, item.productId, item.productQuantity);
    }

    res.send(JSON.stringify(result));
};

module.exports.placeOrder = function(req, res, next){

    let result = {};

    let username = req.body.accessToken.split("-")[0];

    if(!username) {
        result.error = "username not found";
    }else{
        result = Cart.placeOrder(username);
    }

    res.send(JSON.stringify(result));
};