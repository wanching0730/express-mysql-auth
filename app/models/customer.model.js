const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("customer", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            }
        },
        {
            tableName: 'customer',
            indexes: [
                {
                    unique: true,
                    fields: ['id']
                }
            ]
        });
};
