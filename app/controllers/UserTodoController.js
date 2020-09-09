const db = require('../models');
const UserTodo = db.usersTodo;
const Op = db.sequelize.Op;

exports.findOne = (req, res) => {
    UserTodo.findOne({
        where: {
            email: req.query.email,
            password: req.query.password,
        }
    }).then(function (userTodo) {
        res.json(userTodo);
        res.end();
    })
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name ? {name: {[Op.like]: `%${name}%`}} : null;

    UserTodo.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.create = (req, res) => {
    const user = UserTodo.build();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.save()
        .then(function (user){
            res.json(user);
            res.end();
        }).catch(function (err){
            res.status(400).send(err);
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    UserTodo.destroy({
        where: {id: id}
    })
        .then(num =>{
            if (num === 1) {
                res.send({
                    message: 'User was deleted successfully!'
                })
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id}`
                });
        });
};
