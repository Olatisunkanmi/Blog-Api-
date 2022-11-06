const router = require('express').Router();
const userController = require('../Controllers/userController');
const { Register, Login, Protect } = require('../Controllers/auth');

router.route('/signup').post(Register);
router.route('/login').post(Login);

router.use(Protect);

router.route('/:id').delete(userController.deleteUser);
router.route('/:id').put(userController.updateUser);

module.exports = router;
