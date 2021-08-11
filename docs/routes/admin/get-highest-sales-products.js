module.exports = {
    // method of operation
    get: {
        tags: ["Purchase"], // operation's tag.
        description: "Get products with highest sales record", // operation's desc.
        operationId: "getHighestSalesProducts", // unique operation id.
        // expected responses
        responses: {
            // success response code
            200: {
                description: "Admin can retrieve products with highest sales record", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Product", // Product model
                        },
                    },
                },
            },
            500: {
                description: "This is a generic server error", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InternalServerError", // InternalServerError model
                        },
                    },
                },
            },
        },
    },
};
