const express = require("express");
const { Router } = express;
let { Sequelize, sequelize, User, Comment, Like, Post } = require("../models");
const {
  whereIncludeClauseGenerator,
} = require("../utils/whereIncludeClauseGenerator");
const bcrypt = require("bcrypt");

const router = Router();

const models = {
  Comment,
  Like,
  Post,
};

router.get("/", async (req, res) => {
  try {
    let whereIncludeClause = whereIncludeClauseGenerator(req.query, models);

    const userFindAll = await User.findAll(whereIncludeClause);

    res.status(200).send({
      message: "GET all users",
      result: userFindAll,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const userFindPosts = await User.findByPk(id, {
      include: [{ model: Post }],
    });

    res.status(200).send({
      message: "GET User with posts",
      result: userFindPosts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const userFindComments = await User.findByPk(id, {
      include: [{ model: Comment }],
    });

    res.status(200).send({
      message: "GET User with comments",
      result: userFindComments,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id/likes", async (req, res) => {
  try {
    const { id } = req.params;
    const userFindLikedPosts = await User.findByPk(id, {
      include: [{ model: Like, include: [{ model: Post }] }],
    });

    res.status(200).send({
      message: "GET Liked Posts By User",
      result: userFindLikedPosts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/login", async (req, res) => {
  try {
    const { username, password } = req.query;
    const findUserByUsername = await User.findAll({
      where: {
        username,
      },
    });

    console.log(username, password, findUserByUsername[0].password);

    if (!bcrypt.compareSync(password, findUserByUsername[0].password)) {
      throw "Password did not match!";
    }

    res.status(200).send({
      message: "Logged in successfully",
      result: findUserByUsername[0],
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let whereIncludeClause = whereIncludeClauseGenerator(req.query, models);

    const userFindById = await User.findByPk(req.params.id, whereIncludeClause);

    res.status(200).send({
      message: "Get User by ID",
      result: userFindById,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { password, username } = req.body;

    const userFindByUsername = await User.findAll({
      where: {
        username: username,
      },
    });

    if (userFindByUsername.length) {
      throw "User with username " + req.body.username + " exists!";
    }

    const encryptedPassword = await bcrypt.hash(password, 1);

    const createdUser = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    res.status(201).send({
      message: "Created User",
      result: createdUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(201).send({
      message: "Updated User",
      result: editedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

// Get User with Post count
router.post("/test", async (req, res) => {
  try {
    const db = await User.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("Posts.id")), "postCount"],
        ],
      },
      include: [{ model: Post, attributes: [] }],
      group: ["User.id"],
    });

    res.send(db);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

module.exports = router;
