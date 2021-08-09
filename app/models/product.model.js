const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("product", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    },
    {
        tableName: 'product',
        indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ]
    });
};
