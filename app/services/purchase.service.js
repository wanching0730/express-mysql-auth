const db = require("../models");
const Customer = db.customer;
const Product = db.product;
const Purchase = db.purchase;

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
    }
}
