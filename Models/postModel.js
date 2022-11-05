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

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
