const db = require('../../models');
const Task = db.Task;


exports.findAll = (req, res) => {
    Task.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error:' + err)
        })
};

exports.findOne = (req, res) => {
    Task.findOne(
        {
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
    if (!req.body.title) {
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
            res.json(req.params.id)
        })
        .catch(err => {
            res.send('error:' + err)
        })
};

exports.update = (req, res) => {
    console.log( req.params.id)
        Task.update(
            {status: req.body.status},
            {where: {id: req.params.id}}
        )
            .then(() => {
                res.json({status: 'Task Update!'})
            })
            .catch(err => console.log(err))

};
