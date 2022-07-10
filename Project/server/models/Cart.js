const fs = require('fs');
const path = require('path');
const Product = require('./Product');

const filename = path.join(__dirname, '..', 'database', 'carts.json');
//let database = JSON.parse(fs.readFileSync(filename));
let database = [];
module.exports = class Cart{
    constructor(username, items) {
        this.username = username;
        this.items = items;
    }

    static getCartByUsername(username){
        let temp = database.find(obj => obj.username === username);
        if(temp){
            return new Cart(temp.username, temp.items);
        }else{
            return {};
        }
    }

    updateItemQuantity(productId, productQuantity){
        console.log("========cart-updateItemQuantity=======");

        let error = "";
        let result = {};

        let item = this.items.find(obj => obj.id == productId);
        if(item) {
            item.quantity = productQuantity;
            item.totalPrice = item.quantity * item.price;
        }else {
            let product = Product.getProductById(productId);
            if (!product) {
                error = "product not found";
            } else
                item = {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": productQuantity,
                    "totalPrice": product.price * productQuantity
                };
            this.items.push(item);
        }

        if(error) {
            return {error: error};
        }else {
            //Cart.writeToDb();
            return this;
        }
    }

    // //read json to db object
    // static loadFromDb(){
    //     database = JSON.parse(fs.readFileSync(filename));
    //     return database;
    // }

    //write whole db object to json
    static writeToDb(){
        const data = JSON.stringify(database);
        fs.writeFileSync(filename, data);
    }
}