module.exports = {
    components: {
        schemas: {
            // Customer model
            Customer: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "Customer ID in UUID",
                        example: "test",
                    },
                    firstName: {
                        type: "string",
                        description: "Customer's first name",
                        example: "test",
                    },
                    lastName: {
                        type: "string",
                        description: "Customer's last name",
                        example: "test",
                    },
                    email: {
                        type: "string",
                        description: "Customer's email",
                        example: "test@example.com",
                    },
                    createdAt: {
                        type: "string",
                        description: "Creation date for new customer (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                    updatedAt: {
                        type: "string",
                        description: "Update date for new customer (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                },
            },
            // Product model
            Product: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "Product ID",
                        example: "test",
                    },
                    name: {
                        type: "string",
                        description: "Product name",
                        example: "test",
                    },
                    createdAt: {
                        type: "string",
                        description: "Creation date for new product (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                    updatedAt: {
                        type: "string",
                        description: "Update date for new product (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                },
            },
            // Purchase model
            Purchase: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "Purchase ID in UUID",
                        example: "test",
                    },
                    customerId: {
                        type: "string",
                        description: "Customer's ID",
                        example: "test",
                    },
                    productId: {
                        type: "string",
                        description: "Product ID",
                        example: "test",
                    },
                    quantity: {
                        type: "integer",
                        description: "Quantity of products purchased by customer",
                        example: "10",
                    },
                    createdAt: {
                        type: "string",
                        description: "Creation date for new purchase (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                    updatedAt: {
                        type: "string",
                        description: "Update date for new purchase (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                },
            },
            // User model
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "User's self-defined ID",
                        example: "bobo",
                    },
                    name: {
                        type: "string",
                        description: "User's name",
                        example: "Bobo Tan",
                    },
                    password: {
                        type: "string",
                        description: "User's encrypted password for authentication",
                        example: "test12345",
                    },
                    roles: {
                        type: "string",
                        description: "User's roles",
                        example: "admin"
                    },
                    refreshToken: {
                        type: "string",
                        description: "User's refresh token for authentication",
                        example: "12345",
                    },
                    createdAt: {
                        type: "string",
                        description: "Creation date for new user (timestamp generated by MySQL)",
                        example: "2021-08-05T10:28:59.742+00:00",
                    },
                },
            },
            // SuccessResponse model for token generation
            TokenSuccessResponse: {
                type: "object",
                properties: {
                    accessToken: {
                        type: "string",
                        description: "User's new access token",
                        example: "hsjdhsjhskf"
                    },
                    refreshToken: {
                        type: "string",
                        description: "User's new refresh token",
                        example: "wiqiwhfkfn"
                    },
                },
            },
            // SuccessResponse model
            SuccessResponse: {
                type: "object", //data type
                properties: {
                    message: {
                        type: "string", // data type
                        description: "Success message", // desc
                        example: "User was {action} successfully", // example of an error internal code
                    },
                },
            },
            // UnauthenticatedError model
            UnauthenticatedError: {
                type: "object", //data type
                properties: {
                    statusCode: {
                        type: "integer", // data type
                        description: "Error status code", // desc
                        example: 401, // example of an error message
                    },
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Error: Invalid refresh token", // example of an error internal code
                    },
                },
            },
            // BadRequestError model
            BadRequestError: {
                type: "object", //data type
                properties: {
                    statusCode: {
                        type: "integer", // data type
                        description: "Error status code", // desc
                        example: 400, // example of an error message
                    },
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Error: User ID cannot be empty", // example of an error internal code
                    },
                },
            },
            // InternalServerError model
            InternalServerError: {
                type: "object", //data type
                properties: {
                    statusCode: {
                        type: "integer", // data type
                        description: "Error status code", // desc
                        example: 500, // example of an error message
                    },
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Errors occur in database: {error}", // example of an error internal code
                    },
                },
            },
            // Model for login input
            LoginInput: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "User's ID",
                        example: "bobo",
                    },
                    password: {
                        type: "string",
                        description: "User's encrypted password for authentication",
                        example: "12345",
                    },
                }
            },
            // Model for logout input
            LogoutInput: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "User's ID",
                        example: "bobo",
                    }
                }
            },
            // Model for refresh login input
            RefreshLoginInput: {
                type: "object",
                properties: {
                    refreshToken: {
                        type: "string",
                        description: "User's refresh token",
                        example: "sjchsjdoiaof",
                    }
                }
            },
            // id model
            id: {
                type: "string", // data type
                description: "An ID of a customer", // desc
                example: "test", // example of an id
            },
            // page model
            page: {
                type: "string", // data type
                description: "A page number", // desc
                example: "1", // example of an id
            },
        },
    },
};