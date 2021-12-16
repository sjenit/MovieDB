const env = require('dotenv').config();
const expect = require('expect');
const movieController = require('../app/controllers/movieController');

describe('Movie tests', () => {

    it('Should return list of movies', async () => {
        const response = await movieController.getMovies(null, null, null);
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });

    it('Should return list of movies with genre filter', async () => {
        const response = await movieController.getMovies('testgenre', null, null);
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });

    it('Should return no result if no movies with given genre is present', async () => {
        const response = await movieController.getMovies('unknown_genre', null, null);
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBe(0);
    });
    
});