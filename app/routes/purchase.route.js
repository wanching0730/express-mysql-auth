const {savePurchase, getCustomerPurchase, getAllPurchases, getRegularCustomers, getHighestSalesProducts} = require("../controller/purchase.controller");
const {asyncHandler} = require("../utils/error-handler");

module.exports = function(app) {
    app.get("/savePurchase", asyncHandler(savePurchase));
    app.get("/getAllPurchases", asyncHandler(getAllPurchases));
    app.get("/getCustomerPurchase/:id", asyncHandler(getCustomerPurchase));
    app.get("/getRegularCustomers", asyncHandler(getRegularCustomers));
    app.get("/getHighestSalesProducts", asyncHandler(getHighestSalesProducts));
}
