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
        const customerId = uuid4();
        const purchase = {id: uuid4(), customerId: customerId, productId: "test", quantity: 1};

        it("Should not be able to create new customer record with invalid email", async function () {
            const customer = {id: customerId, firstName: "test", lastName: "test", email: "test"};
            const product = {id: "test", name: "test"};
            try {
                await save(customer, product, purchase);
            } catch(err) {
                expect(err.statusCode).to.equal(400);
                expect(err.message).to.equal(`Error: Invalid email format for customer: ${customer.firstName.concat(' ', customer.lastName)}`);
            }
        });

        it("Should not be able to create new product record without product ID", async function () {
            const customer = {id: customerId, firstName: "test", lastName: "test", email: "test@example.com"};
            const product = {id: null, name: "test"};
            try {
                await save(customer, product, purchase);
            } catch(err) {
                expect(err.statusCode).to.equal(400);
                expect(err.message).to.equal(`Error: Product ID cannot be empty for creation: ${product.name}`);
            }
        });
    })

    describe("Success response for creation and selection", function () {
        it("Should be able to create new customer and product with correct input", async function () {
            const customerId = uuid4();
            const customer = {id: customerId, firstName: "test", lastName: "test", email: "test@example.com"};
            const product = {id: "test", name: "test"};
            const purchase = {id: uuid4(), customerId: customerId, productId: "test", quantity: 1};

            await save(customer, product, purchase);
            let result = await getCustomerPurchase(customerId);
            result = result[0];

            expect(result.customer_id).to.equal(customer.id);
            expect(result.product_id).to.equal(product.id);
            expect(result.quantity).to.equal(purchase.quantity);
        });

        it("Should be able to retrieve all purchases", async function () {
            const purchases = await getAllPurchases();

            expect(purchases.length).to.equal(12);
        });

        it("Should be able to retrieve individual customer purchase", async function () {
            let purchase = await getCustomerPurchase("13e4f1a7-7c53-413d-a948-417bf10a8485");
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
