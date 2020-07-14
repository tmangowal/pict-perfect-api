'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    restaurantName: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    cuisine: DataTypes.STRING,
    openTime: DataTypes.INTEGER,
    closeTime: DataTypes.INTEGER,
    costForTwo: DataTypes.INTEGER,
    currency: DataTypes.STRING
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
  };
  return Restaurant;
};