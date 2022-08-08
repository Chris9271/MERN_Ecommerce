require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const HttpError = require('./model/httpResponse');
const passport = require('passport');
const axios = require('axios');

const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'session'
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(express.json());

// create a new session 
app.use(session({
    secret: 'USER_SECRET',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(passport.initialize());
app.use(passport.session());

app.post('/pay-by-prime', (req, res, next) => {
    const {prime, amount, userInfo} = req.body;
    const data = {
        "prime": prime,
        "partner_key": process.env.TAPPAY_KEY,
        "merchant_id": "LUBINTAN_TAISHIN",
        "amount": amount,
        "currency": "TWD",
        "details": "Clothes",
        "cardholder": {
            "phone_number": userInfo.phone,
            "name": userInfo.name,
            "email": userInfo.email
        },
        "remember": false
    }

    axios.post(
        process.env.TAPPAY_PAYBYPRIME,
        data, 
        {headers: 
            {'x-api-key': process.env.TAPPAY_KEY
        }
    }).then((response) => {
        return res.json({
            result: response.data
        })
    }).catch((err) => {
        return res.json({
            result: err.data,
            message: "Payment Failed",
            code: 30010
        })
    })
})

const pageRouter = require('./routes/page');
app.use('/api/page', pageRouter);
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const verifyRouter = require('./routes/verify');
app.use('/api/verify', verifyRouter);
const socialRouter = require('./routes/social');
app.use('/api/social', socialRouter);
const orderRouter = require('./routes/order');
app.use('/api/order', orderRouter);


app.use((req, res, next)=>{
    throw new HttpError(404, "Can't find this route")
})

// Default error handler (add custom error handler)
app.use((err, req, res, next)=>{
    if(res.headersSent){
        return next(err)
    }
    return res.status(err.code || 500).json({message: err.message || "An unknown error occured"})
})

const PORT = process.env.SERVER_PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(PORT);
        console.log('PORT is connected!');
    })
    .catch(err => console.log(err))