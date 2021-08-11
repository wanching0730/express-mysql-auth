/*
Authentication
1. Verify the access token in HTTP header
*/

const jwt = require("jsonwebtoken");

const CustomError = require("../utils/custom-error");

const {secret} = require("../config/auth.config");

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.get("authorization");

        if (!token) throw new CustomError(403, "Error: Token not found");

        token = token.split(" ")[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) throw new CustomError(401, "Error: User is not logged in");
            res.locals.id = decoded.id;
            res.locals.roles = decoded.roles
            next();
        });
    }
}

