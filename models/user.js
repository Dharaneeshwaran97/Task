const express = require("express");
const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    phone: String
}, { collection: "user" });

mongoose.model("user", userSchema);