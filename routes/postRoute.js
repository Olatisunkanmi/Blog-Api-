const router = require('express').Router();
const postController = require('../Controllers/postController.');

router
	.route('/')
	.get(postController.getPosts)
	.post(postController.createPost);

module.exports = router;
