const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("customer", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            firstName: {
                type: Sequelize.STRING,
                field: "first_name"
            },
            lastName: {
                type: Sequelize.STRING,
                field: "last_name"
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
