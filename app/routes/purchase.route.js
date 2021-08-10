const { verifyToken } = require("../middleware/authenticate");
const { isAdmin } = require("../middleware/authorize");
const {savePurchase, getCustomerPurchase, getAllPurchases, getRegularCustomers, getHighestSalesProducts} = require("../controller/purchase.controller");
const {asyncHandler} = require("../utils/error-handler");

module.exports = function(app) {
    app.use("/admin", [asyncHandler(verifyToken), asyncHandler(isAdmin)]);
    app.get("/admin/savePurchase", asyncHandler(savePurchase));
    app.get("/admin/getAllPurchases", asyncHandler(getAllPurchases));
    app.get("/admin/getCustomerPurchase/:id", asyncHandler(getCustomerPurchase));
    app.get("/admin/getRegularCustomers", asyncHandler(getRegularCustomers));
    app.get("/admin/getHighestSalesProducts", asyncHandler(getHighestSalesProducts));
}
