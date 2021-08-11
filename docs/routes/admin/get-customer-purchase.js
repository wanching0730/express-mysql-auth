module.exports = {
    // method of operation
    get: {
        tags: ["Purchase"], // operation's tag.
        description: "Get purchase details of a specific customer", // operation's desc.
        operationId: "getCustomerPurchase", // unique operation id.
        parameters: [
            // expected params.
            {
                name: "id", // name of the param
                in: "path", // location of the param
                schema: {
                    $ref: "#/components/schemas/id", // data model of the param
                },
                required: true, // Mandatory param
                description: "A customer's ID", // param desc.
            },
        ],
        // expected responses
        responses: {
            // success response code
            200: {
                description: "Admin can retrieve purchase details of a specific customer", // response desc.
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
