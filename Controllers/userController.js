const userModel = require('../Models/userModel');
const catchAsync = require('../utils/CatchAsync');
const AppRes = require('../utils/AppResponse');
const AppError = require('../utils/AppError');
const postModel = require('../Models/postModel');

// uiniversal User variable
var User;

exports.getUsers = catchAsync(async (req, res, next) => {
	User = await userModel.find();

	new AppRes(res, User, 200);
});

// delete a User
exports.deleteUser = catchAsync(async (req, res, next) => {
	User = await userModel.findById(req.params.id);

	if (!User) return next(new AppError('User not Found', 404));

	if (User.email !== req.curUser.email)
		return next(
			new AppError('You can only delete your account', 404),
		);

	await userModel.findOneAndDelete(req.params.id);

	User = {};
	new AppRes(res, User, 200);
});

// update user
exports.updateUser = catchAsync(async (req, res) => {
	User = await userModel.findById(req.params.id);

	if (!User) return next(new AppError('User not Found', 404));

	if (User.email !== req.curUser.email)
		return next(new AppError('You can only Edit your account', 404));

	User = await userModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	new AppRes(res, User, 200);
});
