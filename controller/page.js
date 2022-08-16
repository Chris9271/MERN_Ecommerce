const ProductSchema = require('../model/item');

const getMensProduct = async(req, res, next) => {
    let listMen;
    try{
        listMen = await ProductSchema.find({gender: "men"});
        return res.json(listMen);
    }catch(err){
        console.log(err);
        return res.json({
            code: 30006, 
            message: "Something went wrong, please try again later."
        })
    }
}

const getWomensProduct = async(req, res, next) => {
    let listWomen;
    try{
        listWomen = await ProductSchema.find({gender: "women"});
        return res.json(listWomen);
    }catch(err){
        console.log(err);
        return res.json({
            code: 30006, 
            message: "Something went wrong, please try again later."
        })
    }
}

const getSaleProduct = async(req, res, next) => {
    let listSale;
    try{
        listSale = await ProductSchema.find({sale: true});
        return res.json(listSale);
    }catch(err){
        console.log(err);
        return res.json({
            code: 30006, 
            message: "Something went wrong, please try again later."
        })
    }
}

const getNewProduct = async(req, res, next) => {
    let listNew;
    try{
        listNew = await ProductSchema.find({new: true});
        return res.json(listNew);
    }catch(err){
        console.log(err);
        return res.json({
            code: 30006, 
            message: "Something went wrong, please try again later."
        })
    }
}

const getAccessoryProduct = async(req, res, next) => {
    let listAccessory;
    try{
        listAccessory = await ProductSchema.find({accessory: true});
        return res.json(listAccessory);
    }catch(err){
        console.log(err);
        return res.json({
            code: 30006, 
            message: "Something went wrong, please try again later."
        })
    }
}

const getSingleProduct = async(req, res, next) => {
    // 此處id 為 product collection 之 _id
    const {id} = req.params;
    let listProduct;
    try{
        listProduct = await ProductSchema.findById(id);
        return res.json(listProduct);
    }catch(err){
        console.log(err)
        return res.json({
            code: 30006, 
            message: "Something went wrong, please try again later."
        }) 
    }
}

module.exports = {getMensProduct, getWomensProduct, getSaleProduct, getNewProduct, getAccessoryProduct, getSingleProduct}