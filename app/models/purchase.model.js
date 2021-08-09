const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("purchase", {
        customer_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Customer',
                key: 'id'
            }
        },
        product_id: {
            type: Sequelize.STRING,
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
    //
    // Purchase.associate = function(models) {
    //     Purchase.belongsTo(models.Customer, {foreignKey: 'customer_id', as: 'customers'});
    //     Purchase.belongsTo(models.Product, {foreignKey: 'product_id', as: 'products'});
    // };

    return Purchase;
};
