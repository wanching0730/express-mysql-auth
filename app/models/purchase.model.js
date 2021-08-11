const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("purchase", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        customerId: {
            type: DataTypes.UUID,
            field: "customer_id",
            references: {
                model: 'Customer',
                key: 'id'
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
                fields: ['customer_id', 'product_id']
            }
        ]
    });
};
