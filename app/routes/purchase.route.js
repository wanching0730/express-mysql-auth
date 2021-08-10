const {savePurchase, getCustomerPurchase, getAllPurchases, getRegularCustomers, getHighestSalesProducts} = require("../controller/purchase.controller");

module.exports = function(app) {
    app.get("/savePurchase", savePurchase);
    app.get("/getAllPurchases", getAllPurchases);
    app.get("/getCustomerPurchase/:id", getCustomerPurchase);
    app.get("/getRegularCustomers", getRegularCustomers);
    app.get("/getHighestSalesProducts", getHighestSalesProducts);
}
