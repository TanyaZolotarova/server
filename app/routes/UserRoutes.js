const users = require('../controllers/UserController.js');
const router = require('express').Router();

router.get('/', users.findAll);
router.get('/one', users.findOne);
router.post('/', users.create);
router.delete('/:id', users.delete);
router.post('/login', users.login);
router.post('/register', users.create);

module.exports = router;
