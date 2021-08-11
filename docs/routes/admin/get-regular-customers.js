module.exports = {
    // method of operation
    get: {
        tags: ["Purchase"], // operation's tag.
        description: "Get regular customers with frequent purchase records", // operation's desc.
        operationId: "getRegularCustomers", // unique operation id.
        // expected responses
        responses: {
            // success response code
            200: {
                description: "Admin can retrieve regular customers with frequent purchase records", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Customer", // Customer model
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
