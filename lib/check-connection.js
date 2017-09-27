const connection = require('mongoose').connection;
const state = require('mongoose/lib/connectionstate');

module.exports = function getCheckConnection(){
    return function checkConnection(req, res, next){
        if(connection.readyState !== state.connected){
            next({ error: 'Database not available'});
        }
        else next();
    };
};