//STEP 30 => STEP 31 creo lo schema USER
const mongoose = require ('mongoose');

//STEP  31 USER SCHEMA  => STEP 32 importo il modello USer in config/passport.js

const UserSchema = new mongoose.Schema({
    googleId : {
        type : String,
        required : true
    },
    
    displayName : {
        type : String,
        required : true
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    image : {
        type : String,
        
    },

    createdAt : {
        type : Date,
        default: Date.now
    }

})

module.exports = mongoose.model('User', UserSchema)