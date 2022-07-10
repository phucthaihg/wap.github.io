const Cart = require('../models/Cart');

module.exports.getCartByUsername = function(req, res, next){
    let result = {};

    let username = req.params.accessToken;
    if(username) {
        result = Cart.getCartByUsername(username);
    }

    res.send(JSON.stringify(result));
};

module.exports.updateItemQuantity = function(req, res, next){
    console.log("====cartController-updateItemQuantity=====");

    let result = {};

    let username = req.body.accessToken;
    let item = req.body.item;

    if(username && item){
        let cart = Cart.getCartByUsername(username);
        if(!cart){
            cart = new Cart(username, []);
        }

        result = cart.updateItemQuantity(item.productId, item.productQuantity);
    }

    res.send(JSON.stringify(result));
};
