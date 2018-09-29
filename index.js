const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Admin:Krystyna30081987@ds225492.mlab.com:25492/krystynadatabase', {
    useMongoClient: true
});

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model('User', userSchema);

const express = require('express')

var app = express();

app.get('/', function (req, res) {

    User.find({}, (err, users) => {

        const allUsers = [];

        users.forEach((user) => {
            pushed = allUsers.push(" " + user.name);
        });
       // res.send("Names of the users:" + allUsers + ".");
       res.writeHead(200, {"Content-Type": "text/html"});
       res.write("<h1>Names of the users</h1><br>");
       res.write(allUsers + ".<br>");
       res.write("<img src='https://engineering.cerner.com/assets/2016-07-13-difficult-debugging/99-bugs-in-the-code.jpg'>");
       res.end();
    });
    /*
    const allUsers = {};

    users.forEach( (user) => {
        allUsers[user._id] = user;
    });

    res.send(allUsers); 
}); */
});

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, function () {
    console.log('Przykładowa aplikacja nasłuchuje na http://localhost:3000');
});
