const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../model/user');

passport.use(
    new GoogleTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done){
        return done(null, profile)
    })
)

router.post('/google', passport.authenticate('google-token', {session: false}), async(req, res, next) => {
    try{
        const { provider } = req.user;
        const {email} = req.user._json;
        const checkUser = await User.find({email});
        if(checkUser.length > 0){
            // 已有帳號(非第三方，可直接登入)
            if(checkUser[0].password === "facebook"){
                return res.json({
                    code: 30008,
                    message: "Sorry, you already user another social media account register"
                })
            }
            const googleUser = {
                email,
                id: checkUser[0]._id
            }
            const expire = new Date(Date.now() + 60 * 60 * 1000);
            req.session.cookie.expires = expire;
            req.session.user = googleUser;
            req.session.save();
            return res.json({
                code: 20008,
                message: "Google Login Success"
            })
        }else{
            // 建立新用戶
            const createGoogleUser = new User({
                email,
                password: provider,
                token: "",
                isVerify: true,
                isSocialMedia: true
            });
            await createGoogleUser.save();
            const [newUser] = await User.find({email})
            const googleUser = {
                email,
                id: newUser._id
            }
            const expire = new Date(Date.now() + 60 * 60 * 1000);
            req.session.cookie.expires = expire;
            req.session.user = googleUser;
            req.session.save();
            return res.json({
                code: 20008,
                message: "Google Login Success"
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            code: 30007,
            msg: "Something went wrong, please try again later"
        })
    }
})


passport.use(
    new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    function(accessToken, refreshToken, profile, done){
        return done(null, profile)
    })
)
// 將前端送來的透過第三方登入請求經由passport指定facebook-token來驗證
// 成功登入後會建立一個login session，不需要可透過session: false停用
router.post('/facebook', passport.authenticate('facebook-token', {session: false}), async(req, res, next) => {
    //sessionID - req.sessionID
    //user - req.user
    try{
        const { provider } = req.user;
        const {email} = req.user._json;
        const checkUser = await User.find({email});
        if(checkUser.length > 0){
            if(checkUser[0].password === "google"){
                return res.json({
                    code: 30008,
                    message: "Sorry, you already user another social media account register"
                })
            }
            const facebookUser = {
                email,
                id: checkUser[0]._id
            }
            const expire = new Date(Date.now() + 60 * 60 * 1000);
            req.session.cookie.expires = expire;
            req.session.user = facebookUser;
            req.session.save();
            return res.json({
                code: 20008,
                message: "Facebook Login Success"
            })
        }else{
            const createFacebookUser = new User({
                email,
                password: provider,
                token: "",
                isVerify: true,
                isSocialMedia: true
            });
            await createFacebookUser.save();
            const [newUser] = await User.find({email})
            const facebookUser = {
                email,
                id: newUser._id
            }
            const expire = new Date(Date.now() + 60 * 60 * 1000);
            req.session.cookie.expires = expire;
            req.session.user = facebookUser;
            req.session.save();
            return res.json({
                code: 20008,
                message: "Facebook Login Success"
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            code: 30007,
            msg: "Something went wrong, please try again later"
        })
    }

})

module.exports = router;