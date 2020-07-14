'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurantName: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DOUBLE
      },
      image: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      cuisine: {
        type: Sequelize.STRING
      },
      openTime: {
        type: Sequelize.INTEGER
      },
      closeTime: {
        type: Sequelize.INTEGER
      },
      costForTwo: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Restaurants');
  }
};