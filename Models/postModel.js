const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Post must have a title'],
		unique: true,
	},
	description: {
		type: String,
		required: [true, 'Post must have a description'],
	},
	body: {
		type: String,
		require: true,
	},
	author: {
		type: String,
		required: [true, 'Post must have an author'],
	},
	state: {
		type: String,
		default: 'draft',
		enum: ['draft', 'published'],
	},
	readCount: {
		type: Number,
		default: 0,
	},
	readingTime: {
		type: Number,
		default: 0,
	},
	tags: {
		type: [String],
	},
	__v: {
		type: Number,
		select: false,
	},
	created_at: String,
});

// calculate reading time before updating document
PostSchema.pre('findOneAndUpdate', function (next) {
	let Post = this._update;

	// calculate the time in minutes
	if (Post.body) {
		const timeToRead = readingTime(Post.body);
		Post.reading_time = timeToRead;
	}

	next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
