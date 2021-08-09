const path = require('path');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuid4 } = require('uuid');

require('dotenv').config();

const db = require("../models");
const Customer = db.customer;
const Product = db.product;
const Purchase = db.purchase;

module.exports = {
    savePurchase: async (req, res) => {
        const dest = path.resolve(__dirname, '../data', 'sample.csv');

        //await downloadFile(dest);

        // parse csv file
        fs.createReadStream(dest)
            .pipe(csv())
            .on('data', async (row) => {
                console.log(row);

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
                    customerEmail: row.email,
                    productId: row.product_id,
                    quantity: parseInt(row.quantity)
                };

                await Customer.findOrCreate({
                    where: {email: customer.email},
                    defaults: customer
                });
                await Product.findOrCreate({
                    where: {id: product.id},
                    defaults: product
                });
                await Purchase.create(purchase);
            });


        // res.status(200).send({message: "downloaded"});

    }
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
