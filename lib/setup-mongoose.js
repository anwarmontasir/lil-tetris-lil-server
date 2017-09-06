const mongoose = require('mongoose');
const dbURI =  process.env.MONGODB_URI || 'mongodb://localhost/lil-tetris';

mongoose.Promise = Promise;
mongoose.connect( dbURI );

mongoose.connection.on('connected', function(){
    console.log( 'mongoose default connection open to ' + dbURI );
});

mongoose.connection.on('error', function(err){
    console.log( 'mongoose default connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log( 'mongoose default connection disconnected' );
});

process.on( 'SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('mongoose default connection disconnected through app termination' );
        process.exit(0);
    });
});

module.exports = mongoose.connection;