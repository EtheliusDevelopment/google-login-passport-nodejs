// STEP 47 creo il model Story  => STEP 48 importo il modello Story in Routes/index

const mongoose = require ('mongoose');

const StorySchema = new mongoose.Schema ({
    title : {
        type: String,
        required: true,
        trim: true
    },

    body : {
        type: String,
        required: true
    },

    status : {
        type: String,
        default: 'public',
        enum: ['public','private']
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },

    createdAt : {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model('Story', StorySchema)