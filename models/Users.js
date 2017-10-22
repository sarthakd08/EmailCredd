const mongoose = require('mongoose');
const Schema  = mongoose.Schema; // OR const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String 
})

mongoose.model('users', userSchema); // Loading users collection to mongoose(2 arguments);