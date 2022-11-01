const router = require('express').Router();
const postController = require('../Controllers/postController.');
const { Protect } = require('../Controllers/auth');

router
	.route('/')
	.get(postController.getPosts)
	.post(Protect, postController.createPost);

router
	.route('/publish/:id')
	.post(Protect, postController.publishPosts);

router.route('/:id').get(Protect, postController.getAPost);

router.route('/:id').delete(Protect, postController.deletePosts);

router.route('/:id').patch(Protect, postController.updatePost);

module.exports = router;
