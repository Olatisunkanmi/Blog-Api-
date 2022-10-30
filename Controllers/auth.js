const userModel = require('../Models/userModel');
const AppError = require('../utils/AppError');
const AppRes = require('../utils/AppResponse');
const catchAsync = require('../utils/AppResponse');

// universal User variable
var Users;

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
