const { QueryTypes } = require("sequelize");

const db = require("../models");
const Customer = db.customer;
const Product = db.product;
const Purchase = db.purchase;
const sequelize = db.sequelize;

const CustomError = require("../utils/custom-error");
const {validateEmail} = require("../utils/validate");

module.exports = {
    save: async (customer, product, purchase) => {
        // double check validation
        if(!product.id || product.id === "") throw new CustomError(400, `Error: Product ID cannot be empty for creation: ${product.name}`);
        if(!validateEmail(customer.email)) throw new CustomError(400, `Error: Invalid email format for customer: ${customer.firstName.concat(' ', customer.lastName)}`);

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

    getAllPurchases: async(page) => {
        // assume each page contains 10 records
        const limit = 10, offset = page * limit - limit;
        return await sequelize.query(
            `SELECT customer.id customer_id, CONCAT(first_name, ' ', last_name) customer_name, email customer_email, product.id product_id, product.name product_name, quantity 
            FROM purchase INNER JOIN customer on purchase.customer_id=customer.id INNER JOIN product ON purchase.product_id=product.id 
            ORDER BY quantity DESC LIMIT ? OFFSET ?`
            , {replacements: [limit, offset], type: QueryTypes.SELECT});
    },

    getCustomerPurchase: async(customerId) => {
        return await sequelize.query(
            `SELECT customer.id customer_id, CONCAT(first_name, ' ', last_name) customer_name, email customer_email, product.id product_id, product.name product_name, quantity 
            FROM purchase INNER JOIN customer ON purchase.customer_id=customer.id INNER JOIN product ON purchase.product_id=product.id 
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
            `SELECT customer.id customer_id, CONCAT(first_name, ' ', last_name) customer_name, email customer_email, COUNT(*) count  
            FROM purchase INNER JOIN customer ON purchase.customer_id=customer.id GROUP BY customer.id ORDER BY count DESC, customer_name`,
            {type: QueryTypes.SELECT}
        )
    }
}
