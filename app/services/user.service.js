const db = require("../models");
const User = db.user;

const CustomError = require("../utils/custom-error");

module.exports = {
    create: async(body) => {
        await User.findOrCreate({
            where: {id: body.id},
            defaults: body
        });
    },
    // Find a single user with a user ID
    findOne: async (id) => {
        const user = await User.findByPk(id, {attributes: {exclude: ['password', 'refreshToken']}});

        if (!user) throw new CustomError(404, `User not found with user ID: ${id}`);
        return (user);
    },

    // Update a user identified by the user ID in the request
    updateOne: async (id, body) => {
        const user = await module.exports.findOne(id);
        await user.update(body);
    },
}
