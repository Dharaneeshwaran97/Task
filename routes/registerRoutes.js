const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const User = mongoose.model('user');
const Product = mongoose.model('product')
module.exports = app => {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/docs')
        },
        filename: function (req, file, cb) {
            timestamp = Math.floor(new Date() / 1000);
            cb(null, timestamp + '_' + file.originalname);
        }
    })
    var uploads = multer({ storage: storage })

    app.post("/product", uploads.any(), (req, res) => {
        const {
            productName,
            productPrice,
            productDesc
        } = req.body;
        console.log("body", req.body);

        const value = new Product({
            productName,
            productPrice,
            productImage: req.files[0].filename,
            productDesc
        }); try {
            value.save();

            res.redirect('/values');
            console.log("value", value);


        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post('/signin', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({ userName: username, password: password }).then(result => {
            if (result) {
                console.log("Log in Successfully");
                res.redirect('/product');
            } else {
                console.log(" Login UnSuccessfull");

            }
        })

    });


    app.get('/values', async (req, res) => {

        var value = await Product.find();
        res.render("productdetails", {
            value

        })
    });




};