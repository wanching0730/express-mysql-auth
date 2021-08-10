module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                field: "name"
            },
            password: {
                type: Sequelize.STRING,
                field: "password"
            },
            roles: {
                type: Sequelize.STRING,
                field: "roles"
            },
            refreshToken: {
                type: Sequelize.STRING,
                field: "refresh_token"
            }
        },
        {
            tableName: 'user',
            indexes: [
                {
                    unique: true,
                    fields: ['id']
                }
            ]
        });
};
