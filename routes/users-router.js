var express = require('express');
var router = express.Router();
var User = require('../models/user');
var SocialUser = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/api/register', function (req, res, next) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        creation_dt: Date.now()
    });

    let promise = user.save();

    promise.then(function (doc) {
        return res.status(201).json(doc);
    });

    promise.catch(function (err) {
        return res.status(501).json({
            message: 'Error registering user.'
        });
    })
});

router.post('/api/socialUser', function (req, res, next) {
    console.log('req', req.body);
    var socailuser = new SocialUser({
        provider: req.body.provider,
        email: req.body.email,
        name: req.body.name,
        image: req.body.image,
        idToken: req.body.idToken,
        creation_dt: Date.now()
    });

    let promise = socailuser.save();

    promise.then(function (doc) {
        return res.status(201).json(doc);
    });

    promise.catch(function (err) {
        return res.status(501).json({
            message: `Error submitting ${socailuser.provider} data`
        });
    })
})

router.post('/api/login', function (req, res, next) {
    let promise = User.findOne({ email: req.body.email }).exec();

    promise.then(function (doc) {
        if (doc) {
            if (doc.isValid(req.body.password)) {
                // generate token
                let token = jwt.sign({ username: doc.username }, 'this_is_secret_key', { expiresIn: '3h' });
                return res.status(200).json(token);
            } else {
                return res.status(501).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(501).json({ message: "User email is not registered" });
        }
    });

    promise.catch(function (err) {
        return res.status(501).json({ message: "Some Internal error" });
    })
});

module.exports = router;