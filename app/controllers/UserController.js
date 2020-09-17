const db = require('../../models');
const jwt = require("jsonwebtoken");
const config = require('../../config/auth.config.json');
const User = db.User;
const Op = db.sequelize.Op;
const bcrypt = require("bcrypt");


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

    User.findAll({
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
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.email = req.body.email;

    user.save()
        .then(function (user) {
            res.json(user);
            res.end();
        }).catch(function (err) {
        res.status(400).send(err);
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
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
        }
    }).then((user) => {
            if (!user) {
                return res.status(404).send({message: 'User Not found.'});
            }

            const passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            // const expiresIn = 24 * 60 * 60  // in seconds 24 hours;
            const expiresIn = 120 * 2  // 2 min
            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn
            });

            user.update({token})
                .then((user) => {
                    res.status(200).send({
                        user,
                        expiresIn,
                    });

                })
                .catch((err) => res.status(400).send(err))

        }
    ).catch((err) => res.status(400).send(err))


    }

    exports.register = (req, res) => {
        const {password, email, name} = req.body;

        User.findOne({
            where: {
                email,
                password,
                name,
            }
        }).then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.status(500).send({
                    message: `User not found`
                })
            }

            res.end();
        }).catch(() => {
            res.status(500).send({
                message: `User not found`
            })
        })
    }
exports.logout = (req, res) => {
    User.findOne({
        where: {
            token: req.body.token
        }
    }).then(user => {

        user.update({token: null})
            .then((user) =>
                res.status(200).send({user})
            )
            .catch((err) => res.status(400).send(err));

    }).catch(err => res.status(400).send(err))
}

exports.findById = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: {
            id
        },
        include: [
            'tasks'
        ],
    }).then(function (user) {
        res.json(user);
        res.end();
    })
};

exports.me = (req, res) => {
    res.json(res.locals.user);
}