"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      photoURL: DataTypes.STRING,
      caption: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User);
    Post.hasMany(models.Like);
  };
  return Post;
};
