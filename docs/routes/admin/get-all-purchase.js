module.exports = {
    // method of operation
    get: {
        tags: ["Purchase"], // operation's tag.
        description: "Get all purchases", // operation's desc.
        operationId: "getAllPurchases", // unique operation id.
        // expected responses
        responses: {
            // success response code
            200: {
                description: "Admin can retrieve all purchase details", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Purchase", // Purchase model
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
