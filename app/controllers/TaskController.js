const db = require('../models');
const Task = db.tasks;
const Op = db.sequelize.Op;

exports.findAll = (req, res) => {
    Task.findAll()
        .then(tasks => {
            res.json(task)
        })
        .catch(err => {
            res.send('error:' + err)
        })
};

exports.findOne = (req, res) => {
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(task => {
            if (task) {
                res.json(task)
            } else {
                res.send('Task does not exist')
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
};

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Task.create(req.body)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error:' + err)
            })
    }
};

exports.delete = (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.json({status: 'Task Deleted!'})
        })
        .catch(err => {
            res.send('error:' + err)
        })
};

exports.update = (req, res) => {
    if (!req.body.status) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Task.update(
            {status: req.body.status},
            {where: {id: req.params.id}}
        )
            .then(() => {
                res.json({status: 'Task Update!'})
            })
            .error(err => handleError(err))
    }
};

module.export = router
