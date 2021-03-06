'use strict';

/* Dependencies */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/* Module Dependencies */
const { User } = require('../models')
const { asyncHandler } = require('../middleware/asyncHandler.js');
const { authenticateUser } = require('../middleware/auth-user');

/* User GET route to provide details of the current Authenticated User */
router.get('/users', authenticateUser, asyncHandler( async (req, res) => {
    const user = await User.findOne({
        where: {
            emailAddress: req.currentUser.emailAddress
        },
        attributes: {
            exclude: [
                "password",
                "createdAt",
                "updatedAt"
            ],
        },
    })
    res.status(200).json(user)
}));

/* User POST route for the creation of new users. Ensuring that the password provided is encrypted prior to storing in database  */
router.post('/users', asyncHandler( async (req, res) => {
    try {
        const user = req.body;
        let password = user.password;
        password ? user.password = bcrypt.hashSync(password, 10) : null;

        await User.create(req.body)
        res.status(201).location("/").end();
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            const errors = error.errors.map(error => error.message);
            res.status(400).json({ errors });
        } else {
            throw error
        }
    }
}));


module.exports = router;


  