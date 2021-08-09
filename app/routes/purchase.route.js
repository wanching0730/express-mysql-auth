const {savePurchase} = require("../controller/purchase.controller");

module.exports = function(app) {
    app.get("/savePurchase", savePurchase);
}
