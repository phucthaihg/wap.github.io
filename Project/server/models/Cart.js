const fs = require('fs');
const path = require('path');
const Product = require('./Product');

const filename = path.join(__dirname, '..', 'database', 'carts.json');
let database = JSON.parse(fs.readFileSync(filename)).filter(cart => cart.status === "pending");
//let database = [];

module.exports = class Cart{
    constructor(username, items) {
        this.username = username;
        this.items = items;
    }

    static getCartByUsername(username){

        let result = {};
        let idx = database.findIndex(cart => cart.username === username);
        if(idx >= 0){
            result = database[idx];
        }else{
            result = {};
        }
        return result;
    }

    updateItemQuantity(productId, productQuantity){
        let result = {};

        let itemIdx = this.items.findIndex(obj => obj.id == productId);
        if(itemIdx >= 0) {
            //update item in cart
            if(productQuantity == 0){
                this.items.splice(itemIdx, 1);
            }else {
                this.items[itemIdx].quantity = productQuantity;
                this.items[itemIdx].totalPrice = this.items[itemIdx].quantity * this.items[itemIdx].price;
            }
            result = this;
        }else {
            //add item to cart
            let product = Product.getProductById(productId);
            if (!product) {
                result.error = "product not found";
            } else{
                this.items.push(
                    {
                        "id": product.id,
                        "name": product.name,
                        "price": product.price,
                        "quantity": productQuantity,
                        "totalPrice": product.price * productQuantity
                    });
                result = this;
            }
        }

        if(!result.error) {
            Cart.writeToDb();
        }

        return result;
    }

    static placeOrder(username){
        let result = {};

        let idx = database.find(obj => obj.username === username);
        if(idx < 0) {
            result.error = "cart not found";
        }else{
            //update stock
            result.product = Product.updateStocksAfterOrder(database[idx]);

            //update cart status
            database[idx].status = "completed";
            Cart.writeToDb();

            result.cart = {};
        }

        return result;
    }

    //read json to db object
    static loadFromDb(){
        database = JSON.parse(fs.readFileSync(filename)).filter(cart => cart.status === "pending");
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
