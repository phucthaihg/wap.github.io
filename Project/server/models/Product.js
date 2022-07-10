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
        let temp = database.find(prod => prod.id == productId);
        if(temp){
            return new Product(temp.id, temp.name, temp.description, temp.price, temp.image, temp.stock);
        }else{
            return {};
        }
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
    }
}