const expect = require('expect');
const userController = require('../app/controllers/userController');

describe('User tests', () => {

    it('Register - Should return id new user', async () => {
        const timestamp = Date.now();
        const username = `${timestamp}-user`;
        const password = `${timestamp}password`;
        const response = await userController.signUp(username, password);
        expect(typeof response).toBe('string');
    });
    
});