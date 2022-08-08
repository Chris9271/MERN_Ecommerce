const OrderSchema = require('../model/order');

const getUserOrder = async(req, res, next) => {
    const {userId} = req.params;
    const userOrders = await OrderSchema.find({user: userId}).populate('products.product');
    return res.json(userOrders)
}

const addNewOrder = async (req, res, next) => {
    const {userId, cart, card_issuer, card_number, userInfo, orderDate, totalPrice} = req.body;
    
    let card_brand = "";
    if(card_issuer === 1){
        card_brand = "VISA";
    }else if(card_issuer === 2){
        card_brand = "MasterCard";
    }else if(card_issuer === 3){
        card_brand = "JCB";
    }else if(card_issuer === 5){
        card_brand = "AMEX";
    }   

    const newOrder = {
        user: userId,
        products: cart.map((item) => [{
            product: item.id,
            color: item.color,
            size: item.size,
            waist: item.waist,
            length: item.length,
            quantity: item.quantity,
        }]),
        order_total: totalPrice,
        order_date: orderDate,
        card_issuer: card_brand,
        card_number,
        name: userInfo.name,
        address: userInfo.address,
        phone: userInfo.phone
    }

    let createOrder = await OrderSchema.create(newOrder);
    return res.json({
        code: 20010,
        message: "Payment Success",
        data: createOrder
    })
}

module.exports = {getUserOrder, addNewOrder}