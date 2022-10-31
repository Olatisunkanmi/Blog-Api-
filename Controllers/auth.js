const userModel = require('../Models/userModel');
const AppError = require('../utils/AppError');
const AppRes = require('../utils/AppResponse');
const catchAsync = require('../utils/CatchAsync');
const jwt = require('jsonwebtoken');

// universal User variable
var User;

// Sign Token Fn.
const SIGNTOKEN = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

//  Register
exports.Register = catchAsync(async (req, res, next) => {
	const { firstName, lastName, password, email } = req.body;

	console.log(req.body);

	if (!firstName || !lastName || !email || !password) {
		return next(new AppError('Missing Parameters '));
	}

	User = await userModel.create({
		firstName: firstName,
		lastName: lastName,
		password: password,
		email: email,
	});

	const TOKEN = SIGNTOKEN(User._id);
	new AppRes(res, User, 201, TOKEN);
});

// Login
exports.Login = catchAsync(async (req, res, next) => {
	const { password, email } = req.body;

	if (!email || !password) {
		return new AppError('Please Provide email and Password', 400);
	}

	User = await userModel.findOne({ email }).select('+ password');

	console.log(User);
	// if (
	// 	!User ||
	// 	!(await User.correctPassword(password, User.password))
	// ) {
	// 	return next(new AppError('Incorrect email or password', 401));
	// }

	const TOKEN = SIGNTOKEN(User._id);
	new AppRes(res, User, 200, TOKEN);
});
