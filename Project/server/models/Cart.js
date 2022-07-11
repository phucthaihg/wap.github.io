const fs = require('fs');
const path = require('path');
const Product = require('./Product');

const filename = path.join(__dirname, '..', 'database', 'carts.json');
let database = JSON.parse(fs.readFileSync(filename));
//let database = [];

module.exports = class Cart{
    constructor(username, items) {
        this.username = username;
        this.items = items;
        this.status = "pending";
    }

    static getCartByUsername(username){

        let result = {};
        let idx = database.findIndex(cart => cart.username === username && cart.status === "pending");
        if(idx >= 0){
            result = database[idx];
        }else{
            result = {};
        }
        return result;
    }

    static updateItemQuantity(username, productId, productQuantity){
        let result = {};

        let userIdx = database.findIndex(cart => cart.username === username && cart.status === "pending");

        //Create new user's cart
        if(userIdx < 0){
            let cart = new Cart(username, []);
            let product = Product.getProductById(productId);
            cart.items.push(
                {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": productQuantity,
                    "totalPrice": product.price * productQuantity
                });
            database.push(cart);
            Cart.writeToDb();
            result = cart;
            return result;
        }

        //update user's cart
        let cart = database[userIdx];
        let itemIdx = cart.items.findIndex(item => item.id == productId);
        if (itemIdx >= 0) {
            //update item in cart
            let item = cart.items[itemIdx];
            if (productQuantity == 0) {
                //remove item from user's cart if quantity = 0
                cart.items.splice(itemIdx, 1);
            } else {
                //update new quantity & totalPrice
                item.quantity = productQuantity;
                item.totalPrice = item.quantity * item.price;
            }
            result = cart;
        } else {
            //add new item to user's cart
            let product = Product.getProductById(productId);
            cart.items.push(
                {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": productQuantity,
                    "totalPrice": product.price * productQuantity
                });
            result = cart;

        }

        if(!result.error) {
            Cart.writeToDb();
        }

        return result;
    }

    static placeOrder(username){
        let result = {};

        let cartIdx = database.findIndex(cart => cart.username === username && cart.status === "pending");
        if(cartIdx < 0) {
            result.error = "cart not found";
        }else{
            let cart = database[cartIdx];

            //update stock
            let products = Product.updateStocksAfterOrder(cart);
            if(products.error){
                result = products;
            }else{
                result.product = products;
                //update cart status
                cart.status = "completed";

                //create new empty cart for user
                cart = new Cart(username, []);
                database.push(cart);
                Cart.writeToDb();

                result.cart = cart;
            }
        }

        return result;
    }

    //read json to db object
    static loadFromDb(){
        database = JSON.parse(fs.readFileSync(filename));
        return database;
    }

    //write whole db object to json
    static writeToDb(){
        const data = JSON.stringify(database);
        fs.writeFileSync(filename, data);

        //load again to refresh database
        Cart.loadFromDb();
    }
}
