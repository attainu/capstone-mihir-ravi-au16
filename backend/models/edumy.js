const mongoose = require('mongoose');

const edumySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the course a name.'],
        unique: true
    },
    rating:{
        type: Number,
        required: [true, 'Please provide the course a rating.']
    },
    description:{
        type: String,
        required: [true, 'Please provide the course a description.']
    },
    price:{
        type: Number,
        required: [true, 'Please provide the course a price.']
    }
})

const edumy = mongoose.model('edumy', edumySchema);

module.exports = edumy;