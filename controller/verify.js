const alert = require('alert');
const sgMail = require('@sendgrid/mail');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requestVerifyMail= async(req, res, next) => {
    try{
        const {email} = req.body;
        const checkUser = await User.find({email});
        if(checkUser[0].isSocialMedia === true){
            return res.json({
                code: 30009,
                message: "Sorry, social media account not allow to apply this service"
            })
        }
        //產生Token 可能需要加密?
        const token = await jwt.sign({_id: checkUser[0]._id.toString()}, process.env.SERVER_SECRET, {expiresIn: '1h'})

        sgMail.setApiKey(process.env.SENDGRID_KEY);
        const msg = ({
            to: email,
            from: "LUBINTAN.Co <goalsfoods@gmail.com>",
            subject: "LUBINTAN.Co - New Verification Email" ,
            text: "Hello, please the click the link below to verify your identity",
            html: `
            <div>
                <a href=${process.env.BACKEND_URL}/api/verify/t=${token}>Please click here to verify your identity</a>
                <p>or copy the URL below and paste to the browser to verify your identity</p>
                <span>${process.env.BACKEND_URL}/api/verify/t=${token}</span>
            </div>
            `
        })

        const sendMail = async() => {
            try{
                await sgMail.send(msg);
            }catch(err){
                console.log(err);
                return res.json({
                    code: 30007,
                    msg: "Something went wrong, please try again later"
                })
            }
        }

        if(checkUser.length > 0 && checkUser[0].isVerify === true){
            return res.json({
                code: 30005,
                message: "This email address is verified"
            })
        }else if(checkUser.length > 0 && checkUser[0].isVerify === false){
            await User.findOneAndUpdate({email}, {token});
            sendMail();
            return res.json({
                code: 20004,
                message: "New verification mail is already send out"
            })
        }else{
            return res.json({
                code: 30002,
                message: "User is not exist"
            })
        }

    }catch(err){
        console.log(err)
        return res.json({
            code: 30007,
            msg: "Something went wrong, please try again later"
        })
    }
}


const forgetPassword = async(req, res, next) => {
    try{
        const {email} = req.body;
        const checkUser = await User.find({email});
        if(checkUser[0].isSocialMedia === true){
            return res.json({
                code: 30009,
                message: "Sorry, social media account not allow to apply this service"
            })
        }
        const token = await jwt.sign({_id: checkUser[0]._id.toString()}, process.env.SERVER_SECRET, {expiresIn: '1h'})

        sgMail.setApiKey(process.env.SENDGRID_KEY);
        const msg = {
            to: email,
            from: "LUBINTAN.Co <goalsfoods@gmail.com>",
            subject: "LUBINTAN.Co - Reset Password",
            text: "Hello, please the click the link below to reset your password",
            html: `
            <div>
                <a href=${process.env.FRONTEND_URL}/reset/t=${token}>Please click here to reset your password</a>
                <p>or copy the URL below and paste to the browser to reset your password</p>
                <span>${process.env.FRONTEND_URL}/reset/t=${token}</span>
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

        if(checkUser.length > 0){
            await User.findOneAndUpdate({email}, {token});
            sendMail();
            return res.json({
                code: 20005,
                message: "Reset password mail is already send out"
            })
        }else{
            return res.json({
                code: 30002,
                message: "User is not exist"
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            code: 30007,
            msg: "Something went wrong, please try again later"
        })
    }
}


const resetPassword = async(req, res, next) => {

    const {password, verifyStr} = req.body;
    const decodeToken = async(token, secret) => {
        try{
            await jwt.verify(token, secret, async(err, decoded) => {
                if(err){
                    if(err.message === "jwt expired"){
                        return res.json({
                            code: 30010,
                            message: "This Link was expired, please request the new one"
                        });
                    }else{
                        return res.json({
                            code: 30007,
                            message: "Something went wrong, please try again later"
                        });
                    }
                }else{
                    const userId = decoded._id;
                    const checkUser = await User.find({_id: userId});
                    const oldPassword = await argon2.verify(checkUser[0].password, password)
                    if(checkUser.length > 0 && !oldPassword){
                        const hashPassword = await argon2.hash(password);
                        await User.findOneAndUpdate({_id: userId}, {password: hashPassword, isVerify: true, token: ''});
                        sgMail.setApiKey(process.env.SENDGRID_KEY);
                        const msg = {
                            to: checkUser[0].email,
                            from: "LUBINTAN.Co <goalsfoods@gmail.com>",
                            subject: "LUBINTAN.Co - Password Updated Notification",
                            text: "Hello, your password is updated",
                            html: `
                            <div>
                                <p>Hello, you just updated your password</p>
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
                        sendMail();
                        // if(req.session.user.id === userId){
                        //     console.log(req.session.user.id)
                        //     console.log(userId)
                            req.session.destroy();
                        // }
                        return res.json({
                            code: 20004,
                            message: "Your password updated"
                        })
                    }else{
                        return res.json({
                            code: 30006,
                            message: "New Password can't same as old password."
                        })
                    }
                }
            });
        }catch(err){
            console.log(err)
            alert("Something went wrong, please try again later")
            return res.redirect(process.env.FRONTEND_URL);
        }
    }

    decodeToken(verifyStr, process.env.SERVER_SECRET)
}


const getVerifyString = async(req, res, next) => {
    
    const decodeToken = async(token, secret) => {
        try{
            await jwt.verify(token, secret, async(err, decoded) => {
                if(err){
                    alert("Verification link was expired, please apply the new one")
                    return res.redirect(`${process.env.FRONTEND_URL}/sign`);
                }else{
                    const userId = decoded._id;
                    const verifyUser = await User.find({_id: userId});
                    if(verifyUser.length > 0 && verifyUser[0].isVerify !== true){
                        await User.findOneAndUpdate({_id: userId}, {isVerify: true, token: ''})
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

const checkIsUpdate = async(req, res, next) => {
    const {verifyStr} = req.body;
    const checkUserIsUpdate = await User.find({token: verifyStr})
    if(checkUserIsUpdate.length === 0){
        return res.json({
            code: 30009,
            message: "Sorry, the link is expired, please request another one" 
        })
    }
}

module.exports = {requestVerifyMail, forgetPassword, resetPassword, getVerifyString, checkIsUpdate}