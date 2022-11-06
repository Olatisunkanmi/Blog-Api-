const supertest = require('supertest');
const app = require('../app');
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const { connect } = require('../');
const api = supertest(app);
const helper = require('./test_helper');

describe('check environment variables', () => {
	test('check that node environment is test', () => {
		expect(process.env.NODE_ENV).toBe('test');
	});
});

describe('post request to api/signup', () => {
	test('with correct details successfully creates a user', async () => {
		const newUser = {
			firstName: 'User',
			lastName: 'Last User',
			username: 'user',
			email: 'user@mail.com',
			password: '09876',
			password_confirm: '09876',
		};

		const Res = await api
			.post('/api/signup')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);
	});
});

// 		expect(response.status).toBe(201);
// 		expect(response.body).toHaveProperty('username');
// 		expect(response.body).toHaveProperty('firstName');
// 		expect(response.body).toHaveProperty('lastName');
// 		expect(response.body).toHaveProperty('email');
// 		expect(response.body).toHaveProperty('password');
// 		expect(response.body).toHaveProperty('password_confirm');
// 	});
// });
