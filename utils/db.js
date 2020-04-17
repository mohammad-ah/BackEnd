//Import the mongoose module
var mongoose = require('mongoose');

// import env variables
const { database, host, dbUser, dbPass } = require("../bin/.env");

// //Set up default mongoose connection
var mongoDB = `mongodb+srv://${dbUser}:${dbPass}@${host}/${database}`;
mongoDB = `mongodb+srv://Panda:12345%23MM@lionos-lafaz.gcp.mongodb.net/SocialLionosPanda`;

var db = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.connect = db;
