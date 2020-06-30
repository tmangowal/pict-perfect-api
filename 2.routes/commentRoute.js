const express = require("express");
const { Router } = express;
let { Sequelize, sequelize, User, Comment, Like, Post } = require("../models");
const {
  whereIncludeClauseGenerator,
} = require("../utils/whereIncludeClauseGenerator");
const bcrypt = require("bcrypt");

const router = Router();

const models = {
  User,
  Like,
  Post,
};

router.get("/", async (req, res) => {
  try {
    let whereIncludeClause = whereIncludeClauseGenerator(req.query, models);

    const commentFindAll = await Comment.findAll(whereIncludeClause);

    res.status(200).send({
      message: "Get all comments",
      result: commentFindAll,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;

    const commentFindPosts = await Comment.findByPk(id, {
      include: [{ model: Post }],
    });

    res.status(200).send({
      message: "Get comment with post",
      result: commentFindPosts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id/users", async (req, res) => {
  try {
    const { id } = req.params;

    const commentFindUsers = await Comment.findByPk(id, {
      include: [{ model: User }],
    });

    res.status(200).send({
      message: "Get comment with user",
      result: commentFindUsers,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { content, status, PostId, UserId } = req.body;

    const createdComment = await Comment.create({
      ...req.body,
    });

    res.status(201).send({
      message: "Created comment",
      result: createdComment,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(201).send({
      message: "Updated Comment",
      result: editedComment,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.query;

    const deletedComment = await Comment.destroy({
      where: {
        id,
      },
    });

    console.log(deletedComment);

    res.send(200).send({
      message: "Comment deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
