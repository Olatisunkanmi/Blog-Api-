const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const supertest = require('supertest');
const helper = require('./test_helper');
const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
});

describe('post request to /api/v1/signup', () => {
	test('with correct details successfully creates a user', async () => {
		const newUser = {
			firstName: 'User',
			lastName: 'Last User',
			username: 'user',
			email: 'user@mail.com',
			password: '09876',
			password_confirm: '09876',
		};

		const usersInDbBefore = await helper.usersInDb();
		const response = await api
			.post('/api/v1/signup')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersInDbAfter = await helper.dbUsers();
		expect(usersInDbBefore.length).toBe(usersInDbAfter.length - 1);

		// expect(Object.keys(response.body.data)).not.toContain('password');
	});

	test('with incorrect details returns an error', async () => {
		const newUser = {
			firstName: 'User',
			lastName: 'Last User',
			username: 'user',
			email: 'user@mail.com',
			password: '09876',
			password_confirm: '09876',
		};

		const usersInDbBefore = await helper.dbUsers();
		await api
			.post('/api/v1/signup')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		const usersInDbAfter = await helper.usersInDb();
		expect(usersInDbBefore.length).toBe(usersInDbAfter.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
