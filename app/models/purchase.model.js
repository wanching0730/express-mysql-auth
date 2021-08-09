const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("purchase", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        customerEmail: {
            type: DataTypes.STRING,
            field: "customer_email",
            references: {
                model: 'Customer',
                key: 'email'
            }
        },
        productId: {
            type: Sequelize.STRING,
            field: "product_id",
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    },
    {
        tableName: 'purchase',
        indexes: [
            {
                unique: true,
                fields: ['customer_email', 'product_id']
            }
        ]
    });
};
