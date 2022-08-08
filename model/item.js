const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    description: {
        type: String,
    },
    describe: {
        type: String,
    },
    gender: {
        type: String,
    },
    hoverImage: {
        type: String,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String
    },
    color:{
        type: Array,
    },
    detail: {
        type: Array,
    },
    fit:{
        type: Array,
    },
    length:{
        type: Array,
    },
    material:{
        type: Array,
    },
    size: {
        type: Array,
    },
    waist: {
        type: Array,
    },
    new: {
        type: Boolean
    },
    sale: {
        type: Boolean
    },
    accessory: {
        type: Boolean
    }
})

module.exports = mongoose.model('Item', itemSchema);