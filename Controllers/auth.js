const userModel = require('../Models/userModel');
const AppError = require('../utils/AppError');
const AppRes = require('../utils/AppResponse');
const catchAsync = require('../utils/AppResponse');
const jwt = require('jsonwebtoken');

// universal User variable
var Users;

// Sign Token Fn.
const SIGNTOKEN = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

//  Register
exports.Register = catchAsync(async (req, res, next) => {
	const { username, password, email } = req.body;

	if ((!username, password, email)) {
		return next(new AppError('Missing Parameters '));
	}

	Users = await userModel.create({
		username: username,
		password: password,
		email: email,
	});

	const TOKEN = SIGNTOKEN(Users._id);
	new ResponseHandler(res, Users, 201);
});
