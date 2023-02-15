const { date, required } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    image:{
        type:String,
        required:true
    },
    likes: {
        type: Array,
        default: [],
      },
    date:{
        type:Date,
        required:true

    },
    username:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model('Posts',postSchema)