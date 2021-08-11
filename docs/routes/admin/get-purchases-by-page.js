module.exports = {
    // method of operation
    get: {
        tags: ["Purchase"], // operation's tag.
        description: "Get purchases of specific page", // operation's desc.
        operationId: "getPurchasesByPage", // unique operation id.
        parameters: [
            // expected params.
            {
                name: "page", // name of the param
                in: "path", // location of the param
                schema: {
                    $ref: "#/components/schemas/page", // data model of the param
                },
                required: true, // Mandatory param
                description: "A page number", // param desc.
            },
        ],
        // expected responses
        responses: {
            // success response code
            200: {
                description: "Admin can retrieve all purchase details of a specific page", // response desc.
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
