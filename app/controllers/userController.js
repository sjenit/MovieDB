'use strict';
const dbConnection = require('./../datasources/postgresConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'SECRET_KEY';

const signUp = async (username, password) => {
    const db = dbConnection.getConnection();
    const encPassword = await bcrypt.hash(password);
    const newUser = await db('user').insert({
        username,
        password: encPassword
    }).returning('id');
    return newUser[0];
}

const signIn = async (username, password) => {
    const db = dbConnection.getConnection();
    const userData = await db('user').where('username', username).select().first();
    if (userData) {
        let isPasswordValid = await bcrypt.compare(password, userData.password);
        if (isPasswordValid) {
            let token = await jwt.sign(userData, secretKey, { expiresIn: '12h' });
            return token;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

const validateToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader || authHeader === null) {
        res.status(401).json({ message: 'Please sign-in' });
    } else {
        let bearerToken = authHeader.split(' ')[1];
        jwt.verify(bearerToken, secretKey, async function (err, decodedObj) {
            if (err) {
                res.status(401).json({ message: 'Please sign-in' });
            }
            else {
                req.user = decodedObj;
                next();
            }
        });
    }
}

const setFavouriteGenre = async (userId, genre) => {
    const db = dbConnection.getConnection();
    await db('user').where('id', userId).update({ favourite_genre: genre });
    return true;
}

const getRecommendations = async (userId) => {
    const db = dbConnection.getConnection();
    const userData = await db('user').where('id', userId).select().first();
    const result = await db('movie').where('genre', userData.favourite_genre).select();
    return result;
}

module.exports = {
    signIn,
    signUp,
    validateToken,
    setFavouriteGenre,
    getRecommendations
}