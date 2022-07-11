const User = require('../models/User');

module.exports.authenticUser = function(req, res, next){
    let result = User.authenticUser(req.body.username, req.body.password);
    res.send(JSON.stringify(result));
}
