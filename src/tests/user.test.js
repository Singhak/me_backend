const request = require('supertest');
import { app } from '../app';
const mongoose = require('mongoose');
require('dotenv').config();
import { User } from "../models/user.model.js";

describe('Users API', () => {
    let accessToken;
    let refreshToken;
    let user;
    beforeAll(async () => {
        // Connect to a test database before tests
        await mongoose.connect(`mongodb://localhost:27017/tvb`);
        await User.deleteMany({});
    });

    afterAll(async () => {
        // Disconnect from the test database after tests
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear the User collection before each test
        // await User.deleteMany({});
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/v1/users/register')
            .field('username', 'John Doe')
            .field('email', 'john.doe@example.com')
            .field('fullName', 'Anil Kumar')
            .field('password', 'qq2we3we32')
            .attach('avatar', 'src/python.jpg')
            .expect(201);
        expect(response.body).toHaveProperty('message', "User sucessfully created");
    });

    it('should return all users', async () => {

        // await User.create({ name: 'User 2', email: 'user2@example.com' });
        let loginUser = { username: 'John Doe', email: 'john.doe@example.com', password: 'qq2we3we32' }
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(loginUser)
            .expect(200);
        expect(response.body).toHaveProperty('message', 'User LogedIn sucessfully');
        accessToken = response.body.data.accessToken
        refreshToken = response.body.data.refreshToken
        user = response.body.data.user
    });

    it('Update user details', async () => {
        console.log({ accessToken });
        const response = await request(app)
            .post('/api/v1/users/update-details')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ fullName: 'Leaf Baba' })
            .expect(200);
        expect(response.body).toHaveProperty('message', "User detail updated sucessfully");
    });

    it('Update user coverImage', async () => {
        const response = await request(app)
            .post('/api/v1/users/update-cover-image')
            .set('Authorization', `Bearer ${accessToken}`)
            .attach('coverImage', 'src/1.jpg')
            .expect(200);
        expect(response.body).toHaveProperty('message', "Cover Image updated sucessfullly.");
    });

    it('Update user avatar', async () => {
        const response = await request(app)
            .post('/api/v1/users/update-avatar-image')
            .set('Authorization', `Bearer ${accessToken}`)
            .attach('avatar', 'src/cflock.png')
            .expect(200);
        expect(response.body).toHaveProperty('message', "Avatar Image updated sucessfullly.");
    });

    it('Update user refreshToken', async () => {
        const response = await request(app)
            .post('/api/v1/users/refresh-user-token')
            .set('Cookie', `refreshToken=${refreshToken}`)
            .expect(200);
        expect(response.body).toHaveProperty('message', 'Access Token refresh succesfully');
        console.log(response);
        accessToken = response.body.data.accessToken
        refreshToken = response.body.data.refreshToken
    });

    it('Update user password', async () => {
        const response = await request(app)
            .post('/api/v1/users/update-password')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ oldPassword: 'qq2we3we32', newPassword: 'q1w2e3r4t5' })
            .expect(200);
        expect(response.body).toHaveProperty('message', "User Password updated sucessfully");
    });

    it('Login with new password', async () => {

        // await User.create({ name: 'User 2', email: 'user2@example.com' });
        let loginUser = { email: 'john.doe@example.com', password: 'q1w2e3r4t5' }
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(loginUser)
            .expect(200);
        expect(response.body).toHaveProperty('message', 'User LogedIn sucessfully');
        accessToken = response.body.data.accessToken
        refreshToken = response.body.data.refreshToken
        user = response.body.data.user
    });

    it('Log out  user', async () => {
        const response = await request(app)
            .get('/api/v1/users/logout')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);
        expect(response.body).toHaveProperty('message', "User loged out sucessfully");
    });

    // it('should get a user by ID', async () => {
    //     const newUser = await User.create({ name: 'Jane Doe', email: 'jane.doe@example.com' });

    //     const response = await request(app)
    //         .get(`/api/users/${newUser._id}`)
    //         .expect(200);

    //     expect(response.body.name).toBe('Jane Doe');
    // });

    // it('should update a user', async () => {
    //     const newUser = await User.create({ name: 'Old Name', email: 'old@example.com' });
    //     const updatedUserData = { name: 'New Name', email: 'new@example.com' };

    //     const response = await request(app)
    //         .put(`/api/users/${newUser._id}`)
    //         .send(updatedUserData)
    //         .expect(200);

    //     expect(response.body.name).toBe('New Name');
    //     expect(response.body.email).toBe('new@example.com');
    // });

    // it('should delete a user', async () => {
    //     const newUser = await User.create({ name: 'Delete Me', email: 'delete@example.com' });

    //     await request(app)
    //         .delete(`/api/users/${newUser._id}`)
    //         .expect(204);

    //     const user = await User.findById(newUser._id);
    //     expect(user).toBeNull();
    // });

    // it('should handle user not found (GET)', async () => {
    //     await request(app)
    //         .get('/api/users/invalid_id')
    //         .expect(404);
    // });

    // it('should handle user not found (UPDATE)', async () => {
    //     await request(app)
    //         .put('/api/users/invalid_id')
    //         .send({ name: 'Update' })
    //         .expect(404);
    // });

    // it('should handle user not found (DELETE)', async () => {
    //     await request(app)
    //         .delete('/api/users/invalid_id')
    //         .expect(404);
    // });
});
