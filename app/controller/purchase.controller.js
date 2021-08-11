const path = require('path');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuid4 } = require('uuid');

require('dotenv').config();

const {save, getAllPurchases, getCustomerPurchase, getHighestSalesProducts, getRegularCustomers} = require("../services/purchase.service");
const {validateEmail} = require("../utils/validate");

const CustomError = require("../utils/custom-error");

module.exports = {
    savePurchase: async (req, res) => {
        const dest = path.resolve(__dirname, '../data', 'sample.csv');

        //await downloadFile(dest);

        // parse csv file
        fs.createReadStream(dest)
            .pipe(csv())
            .on('data', async (row) => {
                // validation
                // product ID cannot be empty as it's a Primary Key
                if(!row.product_id || row.product_id === "")
                    throw new CustomError(400, `Error: Product ID cannot be empty for creation: ${row.product_name}`);

                // email must be in correct format
                if(!validateEmail(row.email))
                    throw new CustomError(400, `Error: Invalid email format for customer: ${row.first_name.concat(' ', row.last_name)}`);

                // save into database
                const customer = {
                    id: uuid4(),
                    firstName: row.first_name,
                    lastName: row.last_name,
                    email: row.email
                };

                const product = {
                    id: row.product_id,
                    name: row.product_name
                };

                const purchase = {
                    id: uuid4(),
                    customerId: customer.id,
                    productId: row.product_id,
                    quantity: parseInt(row.quantity)
                };

                await save(customer, product, purchase);
            })
            .on('end', async () => {
                res.status(200).send({message: "Data is updated to database successfully"});
            });
    },

    getAllPurchases: async (req, res) => {
        const purchases = await getAllPurchases(req.params.page);
        res.status(200).send(purchases);
    },

    getCustomerPurchase: async (req, res) => {
        const purchases = await getCustomerPurchase(req.params.id);
        res.status(200).send(purchases[0]);
    },

    getHighestSalesProducts: async (req, res) => {
        const products = await getHighestSalesProducts();
        res.status(200).send(products);
    },

    getRegularCustomers: async (req, res) => {
        const customers = await getRegularCustomers();
        res.status(200).send(customers);
    },

}

async function downloadFile(dest) {
    const url = process.env.DATA_FILE_URL;
    const writer = fs.createWriteStream(dest);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}
