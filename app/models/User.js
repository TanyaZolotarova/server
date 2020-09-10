module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
            id: {
                type: Sequelize.INTEGER(11),
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                field: 'name',
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                field: 'password',
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(255),
                field: 'email',
                allowNull: true,
            }
        }, {
            freezeTableName: true,
            indexes: []
        }
    );
}
