'use strict';
const dbConnection = require('./../datasources/postgresConnection');

const addMovie = async (name, genre, releaseDate) => {
    const db = dbConnection.getConnection();
    const movieId = await db('movie').insert({
        name,
        genre,
        release_date: releaseDate,
        up_votes: 0,
        down_votes: 0
    }).returning('id');
    return movieId;
}

const getMovies = async (genreFilter, orderKey, orderType) => {
    const db = dbConnection.getConnection();
    const query = db('movie');

    if (genreFilter) {
        query.where({ genre: genreFilter });
    }

    if (orderKey && orderType) {
        query.orderBy(orderKey, orderType)
    }

    const movies = await query.select();
    return movies;
}

const getMovieById = async (id) => {
    const db = dbConnection.getConnection();
    const movieDetails = await db('movie')
        .leftOuterJoin('review', 'movie.id', 'review.movie_id')
        .where('movie.id', id)
        .select('movie.*', 'review.review')
        .first();
    return movieDetails;
}

const upVote = async (movieId) => {
    const db = dbConnection.getConnection();
    await db('movie').where('id', movieId).increment('up_votes', 1);
    return true;
}

const downVote = async (movieId) => {
    const db = dbConnection.getConnection();
    await db('movie').where('id', movieId).decrement('up_votes', 1);
    return true;
}

const addReview = async (userId, movieId, review) => {
    const db = dbConnection.getConnection();
    const reviewId = await db('review').insert({
        user_id: userId,
        movie_id: movieId,
        review: review,
        created_at: new Date().toISOString()
    }).returning('id');
    return reviewId;
}

module.exports = {
    addMovie,
    getMovies,
    getMovieById,
    upVote,
    downVote,
    addReview
}