/*
Database logic for authentication
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {secret, jwtExpiration, jwtRefreshExpiration} = require("../config/auth.config");
const {create, updateOne} = require("../services/user.service");
const {validatePassword} = require("../utils/validate");

const db = require("../models");
const User = db.user;

const CustomError = require("../utils/custom-error");
const logger = require("../utils/logger")(__filename);

module.exports = {
    register: async (user, roles) => {
        // double check the validation
        if (!user.id) throw new CustomError(400, "Error: User ID cannot be empty for registration");
        if (!user.name) throw new CustomError(400, "Error: User name cannot be empty for registration");
        if (!validatePassword(user.password)) throw new CustomError(400, "Error: Password should be in alphanumeric format");

        // save user's details
        user.roles = roles ? roles : "normal user";
        user.password = bcrypt.hashSync(user.password, 8);
        await create(user);
    },

    login: async (id, password) => {
        // double check the validation
        if (!id) throw new CustomError(400, "Error: User ID cannot be empty for authentication");
        if (!password) throw new CustomError(400, "Error: User password cannot be empty for authentication");

        // check whether user exists in database
        const user = await User.findByPk(id);
        if (!user) throw new CustomError(401, "Error: Invalid user");

        // verify password
        let passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );

        if (!passwordIsValid) {
            logger.error("Error: Invalid password");
            throw new CustomError(401, "Error: Invalid password");
        }

        // generate access token with user's ID and user's roles
        const token = jwt.sign({id: user.id, roles: user.roles}, secret, {
            expiresIn: jwtExpiration // 1 hour
        });

        // generate refresh token with user's ID
        const refreshToken = jwt.sign({id: user.id}, secret, {
            expiresIn: jwtRefreshExpiration // 24 hours
        });

        // update user's refresh token in database
        await updateOne(id, {refreshToken: refreshToken});
        logger.audit(`Refresh token is updated to database successfully`);

        logger.audit(`User ${id} logged in successfully`)
        return ({
            statusCode: 200, body: {
                id: user.id, name: user.name, roles: user.roles,
                accessToken: token, refreshToken: refreshToken
            }
        });
    }
};


