const {validationResult} = require('express-validator');
const argon2 = require('argon2'); // To safety store password 
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const alert = require('alert');

const checkUser = (req, res, next) => {
    if(req.session.user){
        return res.json({
            code: 20000,
            message: "authenticated",
            user: req.session.user.id
        })
    }else{
        return res.json({
            code: 30000,
            message: "not authenticated"
        })
    }
}

const addUser = async(req, res, next) => {
    // return the req after being validate
    const result = validationResult(req);
    // a boolean indicate result object contain errors or not
    if(!result.isEmpty()){
        console.log(result)
    }

    const {email, password} = req.body;
    
    try{
        const newUser = await User.find({email})
        
        if(newUser.length > 0){
            return res.json({
                code: 30001, 
                message: 'This user is already exist'
            })
        }

        //產生Token 可能需要加密
        const Token = await jwt.sign({email}, process.env.SERVER_SECRET, {expiresIn: '1h'});

        // 寄送驗證信設定
        sgMail.setApiKey(process.env.SENDGRID_KEY);
        const msg = {
            to: email,
            from: "LUBINTAN.Co <goalsfoods@gmail.com>",
            subject: "Welcome To LUBINTAN.Co",
            text: "Hello, please the click below to verify your identity",
            html: `
            <div>
                <p>Please verify your identity in an hour, after that please request verify mail again, thanks for your cooperation.</p>
                <a href=${process.env.BACKEND_URL}/api/auth/t=${Token}>Please click here</a>
                <p>or copy the URL below and paste to the browser to verify your identity</p>
                <span>${process.env.BACKEND_URL}/api/auth/t=${Token}</span>
            </div>
            `
        };

        const sendMail = async() => {
            try{
                await sgMail.send(msg);
            }catch(err){
                console.error(err);
                return res.json({
                    code: 30007,
                    msg: "Something went wrong, please try again later"
                })
            }
        }

        const hashPassword = await argon2.hash(password);
        const createUser = new User({
            email,
            password: hashPassword,
            token: Token,
            isVerify: false,
            isSocialMedia: false
        })

        await createUser.save();
        sendMail();
        return res.json({
            code: 20001,
            message: "Register Success, verification mail is already send out."
        })
    }catch(err){
        console.log(err)
        return res.json({
            code: 30007,
            message: "Something went wrong, please try again later"
        })
    }
}


const userLogin = async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const [checkUser] = await User.find({email})
        if(checkUser.length === 0){
            return res.json({
                code: 30002, 
                message: 'User is not exist'
            })
        }else if(checkUser.isVerify === false){
            return res.json({
                code: 30003,
                message: 'Please verify your identity before login'
            })
        }

        const loginUser = {
            id: checkUser._id,
            email: checkUser.email
        }

        const expire = new Date(Date.now() + 60 * 60 * 1000);
    
        // compare data and hash(散列) data return boolean result
        const hashPassword = await argon2.verify(checkUser.password, password)
            if(!hashPassword){
                return res.json({
                    code: 30004, 
                    message: 'Password not match'
                })
            }
            req.session.cookie.expires = expire;
            req.session.user = loginUser;
            req.session.save();
            return res.json({
                code: 20002,
                message: "Success Login"
            })
    }catch(err){
        console.log(err)
        return res.json({
            code: 30007,
            msg: "Something went wrong, please try again later."
        })
    }
}

const userLogout = (req, res, next) => {
    req.session.destroy();
    return res.json({
        code: 20003,
        message: "Success Logout"
    })
}

const getUserVerify = (req, res, next) => {
    const decodeToken = async(token, secret) => {
        try{
            await jwt.verify(token, secret, async(err, decoded) => {
                if(err){
                    alert("Verification link was expired, please apply the new one")
                    return res.redirect(`${process.env.FRONTEND_URL}/sign`);
                }else{
                    const email = decoded.email;
                    const verifyUser = await User.find({email});
                    if(verifyUser.length > 0 && verifyUser[0].isVerify !== true){
                        await User.findOneAndUpdate({email}, {isVerify: true, token: ''})
                        alert("Verify success");
                        return res.redirect(`${process.env.FRONTEND_URL}`);
                    }else if(verifyUser.length > 0 && verifyUser[0].isVerify !== false){
                        alert("This email address is verified");
                        return res.redirect(`${process.env.FRONTEND_URL}`);
                    }
                }
            });
        }catch(err){
            console.log(err)
            alert("Something went wrong, please try again later")
            return res.redirect(`${process.env.FRONTEND_URL}`);
        }
    }

    const {verifyString} = req.params;
    const verifyStr = verifyString.split('=')[1];
    decodeToken(verifyStr, process.env.SERVER_SECRET);
}

module.exports = {userLogin, addUser, userLogout, checkUser, getUserVerify}