const mongoose = require("mongoose");
const User = mongoose.model('user');
const Product = mongoose.model('product')


module.exports = app => {

    app.post('/user', (req, res) => {
        const {
            userName,
            email,
            password,
            phone
        } = req.body;
        const value = new User({
            userName,
            email,
            password,
            phone
        });
        value.save().then(info => {
            if (info) {
                res.redirect('/login');
            }
        });

    });
}