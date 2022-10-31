const router = require('express').Router();
const postController = require('../Controllers/postController.');

router
	.route('/')
	.get(postController.getPosts)
	.post(postController.createPost);

router.route('/publish/:id').post(postController.publishPosts);

router.route('/:id').post(postController.getAPost);

router.route('/:id').delete(postController.deletePosts);

module.exports = router;
