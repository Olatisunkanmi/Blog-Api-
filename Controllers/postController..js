const postModel = require('../Models/postModel');
const catchAsync = require('../utils/CatchAsync');
const AppRes = require('../utils/AppResponse');
const AppError = require('../utils/AppError');

// universal Post variable
var Post;

exports.sortUser = catchAsync(async (req, res, next) => {
	console.log(req.curUser);
	req.query.author = req.curUser.email;
	next();
});

// create a Post
exports.createPost = catchAsync(async (req, res, next) => {
	const { title, desc } = req.body;

	if (!title || !desc) {
		console.log('Missing Something');
		return next(new AppError('Missing Parameters', 404));
	}

	Post = await postModel.create({
		title: title,
		description: desc,
		author: req.curUser.email,
	});

	new AppRes(res, Post, 201);
});

// get All Posts
exports.getPosts = catchAsync(async (req, res, next) => {
	// Filter query
	const queryObj = { ...req.query };
	const excludedFields = ['page', 'sort', 'limit', 'fields'];
	excludedFields.forEach((el) => delete queryObj[el]);

	Post = await postModel.find(queryObj);

	new AppRes(res, Post, 200);
});

// delete Post
exports.deletePosts = catchAsync(async (req, res, next) => {
	await postModel.findByIdAndDelete(req.params.id);

	new AppRes(res, null, 200);
});

// Publish Post
exports.publishPosts = catchAsync(async (req, res, next) => {
	Post = await postModel.findByIdAndUpdate(
		req.params.id,
		{ state: 'published' },
		{
			new: true,
			runValidators: true,
		},
	);

	new AppRes(res, Post, 200);
});

// Get Posts
exports.getAPost = catchAsync(async (req, res, next) => {
	Post = await postModel.findByIdAndUpdate(
		req.params.id,
		{ readCount: +1 },
		{
			new: true,
			runValidators: true,
		},
	);

	console.log(Post);

	if (!req.curUser || !req.curUser.username !== Post.author) {
		return next(
			new AppError(
				'You are not alllowed to View to view this Post',
				403,
			),
		);
	}

	new AppRes(res, Post, 200);
});

exports.deletePosts = catchAsync(async (req, res, next) => {
	Post = await postModel.findById(req.params.id);

	if (Post.author !== req.user.username) {
		return next(
			new AppError('You are only allowed to delete your Posts', 403),
		);
	}

	await postModel.findOneAndDelete(req.params.id);

	new AppRes(res, Post, 200);
});

// edit
exports.updatePost = catchAsync(async (req, res, next) => {
	Post = await postModel.findById(req.params.id);

	if (Post.author !== req.user.username) {
		return next(
			new AppError('You are only allowed to edit your Posts', 403),
		);
	}

	await postModel.findByIdAndUpdate(req.params.id, req.body, {
		set: true,
		runValidators: true,
	});

	new AppRes(res, Post, 200);
});
