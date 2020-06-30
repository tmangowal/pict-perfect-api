"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", [
      {
        fullName: "User One",
        username: "UserOne",
        email: "UserOne@mail.com",
        password:
          "$2b$04$oQv9WgMrfo7FlwfPZpFmHeLhhruW82RaoKcs6ulBNsrKhDCtFdRQO",
        profilePicture: "empty",
        bio: "Bio here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User Two",
        username: "UserTwo",
        email: "UserTwo@mail.com",
        password:
          "$2b$04$oQv9WgMrfo7FlwfPZpFmHeLhhruW82RaoKcs6ulBNsrKhDCtFdRQO",
        profilePicture: "empty",
        bio: "Bio here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User Three",
        username: "UserThree",
        email: "UserThree@mail.com",
        password:
          "$2b$04$oQv9WgMrfo7FlwfPZpFmHeLhhruW82RaoKcs6ulBNsrKhDCtFdRQO",
        profilePicture: "empty",
        bio: "Bio here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User Four",
        username: "UserFour",
        email: "UserFour@mail.com",
        password:
          "$2b$04$oQv9WgMrfo7FlwfPZpFmHeLhhruW82RaoKcs6ulBNsrKhDCtFdRQO",
        profilePicture: "empty",
        bio: "Bio here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User Five",
        username: "UserFive",
        email: "UserFive@mail.com",
        password:
          "$2b$04$oQv9WgMrfo7FlwfPZpFmHeLhhruW82RaoKcs6ulBNsrKhDCtFdRQO",
        profilePicture: "empty",
        bio: "Bio here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
