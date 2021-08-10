const { QueryTypes } = require("sequelize");

const db = require("../models");
const Customer = db.customer;
const Product = db.product;
const Purchase = db.purchase;
const sequelize = db.sequelize;

module.exports = {
    save: async (customer, product, purchase) => {
        await Customer.findOrCreate({
            where: {email: customer.email},
            defaults: customer
        });
        await Product.findOrCreate({
            where: {id: product.id},
            defaults: product
        });
        await Purchase.create(purchase);
    },

    getAllPurchases: async() => {
        return await sequelize.query(
            `SELECT CONCAT(first_name, ' ', last_name) customer_name, email customer_email, product.id product_id, product.name product_name, quantity 
            FROM purchase INNER JOIN customer on purchase.customer_email=customer.email INNER JOIN product ON purchase.product_id=product.id 
            ORDER BY quantity DESC;`
            , {type: QueryTypes.SELECT});
    },

    getCustomerPurchase: async(customerId) => {
        return await sequelize.query(
            `SELECT CONCAT(first_name, ' ', last_name) customer_name, email customer_email, product.id product_id, product.name product_name, quantity 
            FROM purchase INNER JOIN customer ON purchase.customer_email=customer.email INNER JOIN product ON purchase.product_id=product.id 
            WHERE customer.id=? ORDER BY quantity DESC`
            , {replacements: [customerId], type: QueryTypes.SELECT});
    },

    getHighestSalesProducts: async () => {
        return await sequelize.query(
            `SELECT product.id product_id, product.name product_name, SUM(quantity) quantity
             FROM purchase INNER JOIN product ON purchase.product_id = product.id GROUP BY product.id ORDER BY quantity DESC`
            , {type: QueryTypes.SELECT});
    },

    getRegularCustomers: async() => {
        return await sequelize.query(
            `SELECT CONCAT(first_name, ' ', last_name) customer_name, email customer_email, SUM(quantity) quantity  
            FROM purchase INNER JOIN customer ON purchase.customer_email=customer.email GROUP BY email ORDER BY quantity DESC;`,
            {type: QueryTypes.SELECT}
        )
    }
}
