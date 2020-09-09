const usersTodo = require('../controllers/UserTodoController.js');
const router = require('express').Router();

router.get('/', usersTodo.findAll);
router.get('/one', usersTodo.findOne);
router.post('/', usersTodo.create);
router.delete('/:id', usersTodo.delete);
router.delete('/:id', usersTodo.deleteOne);

module.exports = router;
