const db = require('../../models');
const User = db.users;
const Op = db.sequelize.Op;

exports.findOne = (req, res) => {
    User.findOne({
        where: {
            email: req.query.email,
            password: req.query.password,
        }
    }).then(function (user) {
        res.json(user);
        res.end();
    })
}

exports.findAll = (req, res) => {

    User.findAll( {
        include: [
            'tasks'
        ],
    })
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
    const user = User.build();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
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

    User.destroy({
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
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id}`
                })
        })
};

exports.login = (req, res) => {
    const {password, email} = req.body;

    User.findOne({
        where: {
            email,
            password,
        }
    }).then(function (user) {
        if(user) {
            res.json(user);
        } else {
            res.status(500).send({
                message: `User not found`
            })
        }

        res.end();
    }).catch(() =>{
        res.status(500).send({
            message: `User not found`
        })
    })
}
