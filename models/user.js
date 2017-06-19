// Export a function that takes 2 arguments (provided by `index.js`)
module.exports = function(sequelize, DataTypes) {
    // sequelize gets 2 arguments here, the name of the model, as a string, and the model's schema,
    // defined as an object.
    var User = sequelize.define("User", { // Here, sequelize is a connection to our database
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return User;
}

