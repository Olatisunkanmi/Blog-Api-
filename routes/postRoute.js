const router = require('express').Router();
const postController = require('../Controllers/postController.');
const { Protect } = require('../Controllers/auth');

// Logged in or Not Logged In users to get all published posts
router
	.route('/')
	.get(postController.Published, postController.getPosts);

// Logged in or Not Logged In users to get post by Id
router.route('/:id').get(postController.getPostById);

// Protect routes below with JWT.
router.use(Protect);

// create Post
router.route('/').post(postController.createPost);

// publish post
router.route('/publish/:id').post(postController.publishPosts);

//Users get all articles
router
	.route('/articles')
	.get(postController.sortUser, postController.getPosts);

// Get a Post
router.route('/articles/:id').get(postController.getPostById);

// Delete a Post
router.route('/articles/:id').delete(postController.deletePosts);

// update Post
router.route('/articles/:id').patch(postController.updatePost);

module.exports = router;
