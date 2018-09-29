const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Admin:Krystyna30081987@ds225492.mlab.com:25492/krystynadatabase', {
    useMongoClient: true
});

//new user Schema
const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

//pre-save method
userSchema.pre('save', function(next) {
    //pobranie aktualnego czasu
    const currentDate = new Date();

    //zmiana pola na aktualny czas
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

//model based on userSchema
const User = mongoose.model('User', userSchema);

//instancje klasy User
const james = new User({
    name: 'James',
    username: 'James_the_boy',
    password: 'password'
});

james.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + james.name +  ' zapisany pomyslnie');
});

const peter = new User({
    name: 'Peter',
    username: 'Peter_the_boy',
    password: 'password'
});

peter.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + peter.name +  ' zapisany pomyslnie');
});
