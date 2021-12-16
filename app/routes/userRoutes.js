'use strict';
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');


router.post('/register', async (req, res, next) => {
    try {
        const reqBody = req.body;
        const mandatoryFields = ['username', 'password'];
        for (let f of mandatoryFields) {
            if (!reqBody[f]) {
                return res.status(403).json({ message: `Mandatory field missing: ${f}` });
            }
        }

        const result = await userController.signUp(reqBody.username, reqBody.password);
        res.status(200).json({ result });

    } catch (error) {
        next(error);
    }
});

router.post('/signin', async (req, res, next) => {
    try {
        const reqBody = req.body;
        const mandatoryFields = ['username', 'password'];
        for (let f of mandatoryFields) {
            if (!reqBody[f]) {
                return res.status(403).json({ message: `Mandatory field missing: ${f}` });
            }
        }

        const result = await userController.signIn(reqBody.username, reqBody.password);
        if (result) {
            return res.status(200).json({ token: result });
        }
        else {
            return res.status(401).json({ message: 'Failed to sign-in' });
        }

    } catch (error) {
        next(error);
    }
});

router.get('/recommendation', async (req, res, next) => {

});

router.put('/genre', async (req, res, next) => {

});

module.exports = router;