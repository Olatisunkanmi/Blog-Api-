const { Schema } = require('mongoose');

const mongoose = require('mongoose').Schema();

const Post = new Schema({
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

	created_at: Date,

	__v: {
		type: Number,
		select: false,
	},
});
