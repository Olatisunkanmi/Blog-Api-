const router = require('express').Router();
const postController = require('../Controllers/postController.');

router
	.route('/')
	.get(postController.getPosts)
	.post(postController.createPost);

router.route('/publish/:id').post(postController.publishPosts);

module.exports = router;
