
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('task', {
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
            status: {
                type: Sequelize.BOOLEAN,
                field: 'status',
                allowNull: false,
                defaultValue: true
            },
        },
        {
            freezeTableName: true,
            indexes: []
        }
    );
}
