var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.post('/api/register', function (req, res, next) {
    console.log('req', req.body);
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

module.exports = router;