module.exports = (sequelize, Sequelize) => {
    return sequelize.define('userTodo', {
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

           description: {
                type: Sequelize.STRING(255),
                field: 'text',
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING(255),
                field: 'boolean',
                allowNull: true,
            },
            user_id: {
            type: Sequelize.INTEGER(11),
            field: 'id',
            autoIncrement: true,
            allowNull: false,
        },
        }, {
            freezeTableName: true,
            indexes: []
        }
    );
}
