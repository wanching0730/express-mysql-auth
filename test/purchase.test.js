const chai = require("chai");
const expect = chai.expect;
const { v4: uuid4 } = require('uuid');

const {initDatabase} = require("../app/utils/init-database");

const {save, getAllPurchases, getHighestSalesProducts, getCustomerPurchase, getRegularCustomers } = require("../app/services/purchase.service");

before(async function () {
    await initDatabase();
});

describe("User Controller", function() {
    describe("Error response for customer and product creation", function () {
        const purchase = {id: uuid4(), customerEmail: "test", productId: "test", quantity: 1};

        it("Should not be able to create new customer record with invalid email", async function () {
            const customer = {id: uuid4(), firstName: "test", lastName: "test", email: "test"};
            const product = {id: "test", name: "test"};
            try {
                await save(customer, product, purchase);
            } catch(err) {
                expect(err.statusCode).to.equal(400);
                expect(err.message).to.equal(`Error: Invalid email format for customer: ${customer.firstName.concat(' ', customer.lastName)}`);
            }
        });

        it("Should not be able to create new product record without product ID", async function () {
            const customer = {id: uuid4(), firstName: "test", lastName: "test", email: "test@example.com"};
            const product = {id: null, name: "test"};
            try {
                await save(customer, product, purchase);
            } catch(err) {
                expect(err.statusCode).to.equal(400);
                expect(err.message).to.equal(`Error: Product ID cannot be empty for creation: ${product.name}`);
            }
        });
    })

    describe("Success response for selection", function () {
        it("Should be able to retrieve all purchases", async function () {
            const purchases = await getAllPurchases();

            expect(purchases.length).to.equal(6);
        });

        it("Should be able to retrieve individual customer purchase", async function () {
            let purchase = await getCustomerPurchase("c9f9a211-bef3-4f96-ba1e-aa501abfc550");
            purchase = purchase[0];

            expect(purchase.customer_email).to.equal("marcelene.heaney@kirlinroob.com");
            expect(purchase.product_id).to.equal("793");
            expect(purchase.quantity).to.equal(10);
        });

        it("Should be able to retrieve highest sales products", async function () {
            const products = await getHighestSalesProducts();

            // only check the first highest sales product
            expect(products[0].product_id).to.equal("510");
            expect(products[0].product_name).to.equal("product_510");
            expect(products[0].quantity).to.equal("13");
        });

        it("Should be able to retrieve regular customers with frequent purchase", async function () {
            const customers = await getRegularCustomers();

            // only check the most frequent purchase
            expect(customers[0].customer_name).to.equal("Darby Dooley");
            expect(customers[0].customer_email).to.equal("sharan_yundt@prosacco.us");
            expect(customers[0].count).to.equal(1);
        });
    })
})
