// Connection to the standard Sequelize library
var Sequelize = require('sequelize');
// References our connection to the database
var sequelize = require('../config/config.json');

// Create a Burger model
var Burger = sequelize.define("burger", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    burger_name: {
        type: Sequelize.STRING,
        allowNull: false
},
    devoured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
},{
    instanceMethods: {
        selectAll: function(onSuccess, onError){
            Burger.findAll({}, {raw: true})
                            .success(onSuccess).error(onError);
        },
        updateOneById: function(id, onSuccess, onError){
                var burgerId = id;
                var burgerName = this.burger_name;

                Burger.update({ burger_name: burgerName},
                    {where: {id: id} })
                    .success(onSuccess).error(onError);
        },
        add: function(onSuccess, onError){
            var burgerName = this.burger_name;

            Burger.build({ burgerName: burger_name}).save().success(onSuccess).error(onError);

        }
    }
}
});

// Sync with database
Burger.sync();

// Make this model available for use by other files
module.exports = Burger;