const users = require('../controllers/UserController.js');
const router = require('express').Router();
const auth = require('../Middleware/auth');

// auth
router.get('/', users.findAll);
router.get('/one', users.findOne);
router.post('/', users.create);
router.delete('/:id', users.delete);
router.post('/login', users.login);
router.post('/register', users.create);
router.post('/logout', users.logout);
router.put('/:id/update', users.update);

router.get('/me', auth, users.me);

module.exports = router;
