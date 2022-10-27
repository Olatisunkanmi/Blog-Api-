const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
		unique: true,
	},
	author: {
		type: String,
		required: true,
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
	tags: [String],

	created_at: String,

	__v: {
		type: Number,
		select: false,
	},
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
