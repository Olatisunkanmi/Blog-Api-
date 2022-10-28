const postModel = require('../Models/postModel');
const catchAsync = require('../utils/CatchAsync');
const AppRes = require('../utils/AppResponse');
const AppError = require('../utils/AppError');

// universal Post variable
var Post;

// create a Post
exports.createPost = catchAsync(async (req, res, next) => {
	const { title, desc, author } = req.body;

	if (!title || !desc || !author) {
		console.log('Missing Something');
		return next(new AppError('Missing Parameters', 404));
	}

	Post = await postModel.create({
		title: title,
		description: desc,
		author: author,
	});

	new AppRes(res, Post, 201);
});

// get All Posts
exports.getPosts = catchAsync(async (req, res, next) => {
	Post = await postModel.find();

	new AppRes(res, Post, 200);
});

exports.deletePosts = catchAsync(async (req, res, next) => {
	await postModel.findByIdAndDelete(req.params.id);

	new AppRes(res, null, 200);
});
