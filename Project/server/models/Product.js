const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, '..', 'database', 'products.json');
let database = JSON.parse(fs.readFileSync(filename));

module.exports = class Product{
    constructor(id, name, description, price, image, stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    static getProductById(productId){
        let result = {};
        let idx = database.findIndex(prod => prod.id == productId);
        if(idx >= 0){
            result = database[idx];
        }else{
            result = {};
        }

        return result;
    }

    static updateStocksAfterOrder(cart){

        let result = {};

        for(let i = 0; i < cart.items.length; i++){
            let prodIdx = database.findIndex(prod => prod.id == cart.items[i].id);
            if(prodIdx >= 0){
                let product = database[prodIdx];

                let stock = parseInt(product.stock);
                stock = stock - parseInt(cart.items[i].quantity);

                if(stock < 0){
                    result.error = "Quantity > Stock";
                    break;
                }else {
                    product.stock = stock;
                }
            }
        }

        if(!result.error) {
            result = Product.writeToDb();
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
        return Product.loadFromDb();
    }
}