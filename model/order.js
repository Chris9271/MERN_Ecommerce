const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    // userId, productId, amount, total, size, waist, length, color, card number
    // _id -> orderId

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // get product name price discount... by populate
    products: [[{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        },
        quantity: {
            type: Number
        },
        size: {
            type: String
        },
        color: {
            type: String
        },
        waist: {
            type: String
        },
        length: {
            type: String
        }
    }]],
    order_total: {
        type: Number
    },
    order_date: {
        type: String
    },
    card_issuer:{
        type: String
    },
    card_number:{
        type: String
    },
    name: {
        type: String
    }, 
    address: {
        type: String
    }, 
    phone: {
        type: String
    }
})

module.exports = mongoose.model('Order', orderSchema);