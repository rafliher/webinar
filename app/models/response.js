module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define("responses", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        phone: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    });

    return Response;
};
