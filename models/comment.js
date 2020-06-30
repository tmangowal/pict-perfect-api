"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);
  };
  return Comment;
};
