const mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})

var commentSchema = new Schema({
    title:{
        type: String,
        default: 'tourist',
        required: true
    },
    classification:{
        type: String
    },
    content: {
        type: String
    },
    autor: {
        type: String,
        required: true
    },
    creatDate: {
        type: Date,
        default: Date.now
    },
    readAmount:{
        type: Number,
        default: 0
    },
    replyAmount:{
        type: Number,
        default: 0
    },
    // answer:{

    // }
})

module.exports = mongoose.model('Comment', commentSchema)