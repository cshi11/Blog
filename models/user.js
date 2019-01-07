const mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})

var userSchema = new Schema({
    username:{
        type: String,
        default: 'tourist',
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    creatDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    avater: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    gender: {
        type: String,
        enum: ['male', 'unknow', 'female'],
        default: 'unknow'
    },
    birthday: {
        type: Date
    },
    status: {
        type: String,
        enum: ['tourist', 'member', 'violation'],
        default: 'tourist'
    }
})

module.exports = mongoose.model('User', userSchema)