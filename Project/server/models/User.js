const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, '..', 'database', 'users.json');
let database = JSON.parse(fs.readFileSync(filename));

module.exports = class User{
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static authenticUser(username, password){
        let result = {};

        let userIdx = database.findIndex(user => user.username === username && user.password === password);

        if(userIdx < 0){
            result.error = "Username or Password invalid";
        }else{
            result.accessToken = username + "-" + Date.now().toString();
        }

        console.log(result);
        return result;
    }

    // read json to db object
    // static loadFromDb(){
    //     database = JSON.parse(fs.readFileSync(filename));
    //     return database;
    // }

    //write whole db object to json
    // static writeToDb(){
    //     const data = JSON.stringify(database);
    //     fs.writeFileSync(filename, data);
    // }
}