// for authentication routes
const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout');
const refreshToken = require('./auth/refreshToken');

// for admin routes
const createPurchase = require('./admin/create-purchase');
const getAllPurchase = require('./admin/get-all-purchase');
const getCustomerPurchase = require('./admin/get-customer-purchase');
const getHighestSalesProduct = require('./admin/get-highest-sales-products');
const getPurchasesByPage = require('./admin/get-purchases-by-page');
const getRegularCustomers = require('./admin/get-regular-customers');

module.exports = {
    paths:{
        // authentication
        '/register':{
            ...register
        },
        '/login':{
            ...login
        },
        '/logout':{
            ...logout
        },
        '/refreshToken':{
            ...refreshToken
        },

        // admin
        '/admin/savePurchase':{
            ...createPurchase
        },
        '/admin/getAllPurchases':{
            ...getAllPurchase
        },
        // relationship mapping
        '/admin/getAllPurchases/{page}':{
            ...getPurchasesByPage
        },
        '/admin/getCustomerPurchase/{id}':{
            ...getCustomerPurchase
        },
        '/admin/getRegularCustomers':{
            ...getRegularCustomers
        },
        '/admin/getHighestSalesProducts':{
            ...getHighestSalesProduct
        }
    }
}
