const postModel = require('../Models/postModel');
const catchAsync = require('../utils/CatchAsync');
const AppRes = require('../utils/AppResponse');
const AppError = require('../utils/AppError');
const readingTime = require('../utils/readTime');
// universal Post variable
var Post;

exports.searchId = catchAsync(async (req, res, next) => {
	console.log(req.params.id);
	Post = await postModel.findById(req.params.id);
	console.log(Post);

	if (!Post) {
		return next(new AppError('Post not found', 404));
	} //-

	req.Post = Post;
	next();
});

// middleware for unprotected Post by :id
exports.unprotectedPostById = catchAsync(async (req, res, next) => {
	Post = await postModel.findById(req.params.id);

	if (!Post) {
		return next(new AppError('Post not found', 404));
	} //-
	else if (!req.curUser && Post.state !== 'published') {
		return next(new AppError('Login to view unpublished posts', 401));
	} // --

	req.Post = Post;
	next();
});

exports.protectedPostById = catchAsync(async (req, res, next) => {
	if (req.curUser.email !== Post.author) {
		return next(
			new AppError(
				'Can only view posts created by you in draft state',
				401,
			),
		);
	} else if (
		req.curUser.email === Post.author &&
		Post.state !== 'published'
	) {
		return next(new AppRes(res, Post, 200));
	}

	next();
});

// Middleware to query post by Published state
exports.Published = catchAsync(async (req, res, next) => {
	req.query.limit = '20';
	req.query.sort = '-readCount, -readingTime, -created_at';
	req.query.state = 'published';

	next();
});

// query by username
exports.sortUser = catchAsync(async (req, res, next) => {
	req.query.author = req.curUser.username;
	next();
});

// create a Post
exports.createPost = catchAsync(async (req, res, next) => {
	const { title, desc, body, tags } = req.body;

	if (!title || !desc || !body) {
		return next(new AppError('Missing Parameters', 404));
	}

	Post = await postModel.create({
		title: title,
		body: body,
		tags,
		description: desc,
		author: req.curUser.username,
		readingTime: readingTime(body),
	});

	new AppRes(res, Post, 201);
});

// get All Posts
exports.getPosts = catchAsync(async (req, res, next) => {
	// Filter query
	const queryObj = { ...req.query };
	const excludedFields = ['page', 'sort', 'limit', 'fields'];
	excludedFields.forEach((el) => delete queryObj[el]);

	// queryStr = JSON.parse(queryObj);
	let query = postModel.find(queryObj);

	// 4) Pagination
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 100;
	//👆🏼   turn string to int
	const skip = (page - 1) * limit;
	query = query.skip(skip).limit(limit);
	if (req.query.page) {
		const numpostModels = await postModel.countDocuments();
		if (skip > numpostModels)
			throw new Error('This page does not exist');
	}
	// !                    -----------            --Execute query

	const Post = await query;
	new AppRes(res, Post, 200);
});

// Publish Post
exports.publishPosts = catchAsync(async (req, res, next) => {
	Post = req.Post;

	if (Post.author !== req.user.username) {
		return next(
			new AppError('You are only allowed to publish your Posts', 404),
		);
	}

	Post = await postModel.findOneAndUpdate(
		Post._id,
		{ state: 'published' },
		{
			new: true,
			runValidators: true,
		},
	);

	new AppRes(res, Post, 200);
});

// Get Post by ID
exports.getPostById = catchAsync(async (req, res, next) => {
	Post = req.Post;

	// update blog read count
	Post.readCount += 1;
	await Post.save();

	new AppRes(res, Post, 200);
});

// delete Posts
exports.deletePosts = catchAsync(async (req, res, next) => {
	Post = req.Post;

	if (!Post)
		if (Post.author !== req.curUser.username) {
			return next(
				new AppError(
					'You are only allowed to delete your Posts',
					404,
				),
			);
		}

	await postModel.findOneAndDelete(Post._id);

	new AppRes(res, null, 200);
});

// edit Posts
exports.updatePost = catchAsync(async (req, res, next) => {
	Post = req.Post;

	if (Post.author !== req.user.username) {
		return next(
			new AppError('You are only allowed to edit your Posts', 404),
		);
	}

	Post = await postModel.findByIdAndUpdate(Post._id, req.body, {
		set: true,
		runValidators: true,
	});

	new AppRes(res, Post, 200);
});
