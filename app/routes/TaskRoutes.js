const tasks = require('../controllers/TaskController.js');
const router = require('express').Router();

router.get('/', tasks.findAll);
router.get('/one', tasks.findOne);
router.post('/', tasks.create);
router.delete('/:id', tasks.delete);
router.put('/', tasks.update);


module.exports = router;
