const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const userModel = require('../models/userModel');

beforeEach(async () => {
	await User.deleteMany({});
	await User.create({
		firstName: 'User',
		lastName: 'Last User',
		username: 'user',
		email: 'user@mail.com',
		password: '09876',
		password_confirm: '09876',
	});
});

describe('POST request to /api/v1/login', () => {
	test('is successful if user is registered to database', async () => {
		const response = await api
			.post('/api/v1/login')
			.send({
				email: 'user@mail.com',
				password: '09876',
				password_confirm: '09876',
			})
			.expect(200);

		expect(response.body).toHaveProperty('token');
	});

	test('returns error if details are incorrect', async () => {
		const response = await api
			.post('/api/v1/login')
			.send({
				email: 'user@mail.com',
			})
			.expect(401);

		expect(response.body).not.toHaveProperty('token');
	});
});

afterAll(() => {
	mongoose.connection.close();
});
