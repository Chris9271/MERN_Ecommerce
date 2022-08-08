const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    color:{
        type: String
    },
    size:{
        type: String
    },
    length:{
        type: String
    },
    waist: {
        type: String
    },
    quantity: {
        type: Number
    },
    total: {
        type: Number
    }
    // subTotal: {
    //     type: Number
    // }
})

module.exports = mongoose.model('Cart', cartSchema);