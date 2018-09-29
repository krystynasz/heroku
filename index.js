const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fs = require('fs');
var path = require('path');
var Mustache = require("mustache");

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
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Names of the users</h1><br>");
        res.write(allUsers + ".<br>");
        res.write("<img src='https://engineering.cerner.com/assets/2016-07-13-difficult-debugging/99-bugs-in-the-code.jpg'>");
        res.end();
    });
});

app.get('/users', function (req, res) {

    User.find({}, (err, users) => {

        const allUsers = [];

        users.forEach((user) => {
            pushed = allUsers.push(" " + user.name);
        });

        var page = fs.readFileSync("templates/index.html").toString();

        const usersForDisplay = allUsers.join();
        var data = { usersForDisplay: usersForDisplay };
        var pageForDisplay = Mustache.render(page, data);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(pageForDisplay);
        res.end();
    });
});

app.get('/style.css', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/css' });
    var fileContents = fs.readFileSync('./templates/style.css', { encoding: 'utf8' });
    res.write(fileContents);
    res.end();
});

app.get('/script.js', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/css' });
    var fileContents = fs.readFileSync('./templates/script.js', { encoding: 'utf8' });
    res.write(fileContents);
    res.end();

});
const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, function () {
    console.log('Przykładowa aplikacja nasłuchuje na http://localhost:5000');
});
