const db = require('../../models');
const User = db.User;

const {secret} = require('../../config/auth.config.json');
const jwt = require('jsonwebtoken');

module.exports = async  (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.decode(token, secret);
        const userId = decodedToken.id;
        const user = await User.findByPk(userId, {
            include: [
                'tasks'
            ],
        });
        if (!user) {
            res.status(401).json( {
                error: 'Invalid data'
            });
        } else {
            res.locals.user = user;
            next();
        }
    } catch {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};