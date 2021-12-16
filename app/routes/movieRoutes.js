'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const userController = require('./../controllers/userController');
const movieController = require('./../controllers/movieController');

router.get('/:id', userController.validateToken, async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const result = await movieController.getMovieById(movieId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const genreFilter = req.query.genre || null;
        const orderKey = req.query.order_key || null;
        const orderType = req.query.order_type || null;

        const result = await movieController.getMovies(genreFilter, orderKey, orderType);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/upvote', userController.validateToken, async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const result = await movieController.upVote(movieId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/downvote', userController.validateToken, async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const result = await movieController.downVote(movieId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/review', userController.validateToken, async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const userId = req.user.id;
        const review = req.body.review;

        if (!review) {
            return res.status(403).json({ message: 'Please provide review' });
        }

        const result = await movieController.addReview(userId, movieId, review);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/', userController.validateToken, async (req, res, next) => {
    try {
        const reqBody = req.body;

        const mandatoryFields = ['name', 'genre', 'release_date'];
        for (let f of mandatoryFields) {
            if (!reqBody[f]) {
                return res.status(403).json({ message: `Mandatory field missing: ${f}` });
            }
        }

        const name = reqBody.name.trim();
        const genre = reqBody.genre.trim();
        const releaseDate = moment(reqBody.release_date).format('YYYY-MM-DD');

        const result = await movieController.addMovie(name, genre, releaseDate);
        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
});

module.exports = router;