"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {}, {});
  Like.associate = function (models) {
    // associations can be defined here
    Like.belongsTo(models.User);
    Like.belongsTo(models.Post);
  };
  return Like;
};
