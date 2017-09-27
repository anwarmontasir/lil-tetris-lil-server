const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
    .get('/', (req, res, next) => {
        User.findById(req.user.id)
            .select('name scores')
            .lean()
            .then(user => res.send(user))
            .catch(next);
    })

    .post('/scores', bodyParser, (req, res, next) => {
        const { body } = req;
        const { id } = req.user;
        User.findByIdAndUpdate(id, {
            $push: { scores: body.score }
        }, {
            new: true
        })
            .then(user => res.send(user))
            .catch(next);
    });

module.exports = router;