const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./User.js')(sequelize, Sequelize);
db.tasks = require('./Task.js')(sequelize, Sequelize);

db.users.hasMany(db.tasks, {as: 'tasks'});
db.tasks.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users',
});

module.exports = db;
