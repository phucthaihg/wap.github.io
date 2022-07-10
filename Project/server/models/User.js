const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, '..', 'database', 'users.json');
let database = [];

module.exports = class User{
    constructor(username, password) {
        this.username = username;
        this.password = password;
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