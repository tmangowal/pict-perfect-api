const express = require("express");
const { Router } = express;
let { Sequelize, sequelize, User, Comment, Like, Post } = require("../models");
const {
  whereIncludeClauseGenerator,
} = require("../utils/whereIncludeClauseGenerator");
const bcrypt = require("bcrypt");
const { S3Client, Bucket } = require("../utils/S3Client");

const multer = require("multer");
const upload = multer();

const router = Router();

const models = {
  Comment,
  Like,
  User,
};

router.post("/", upload.single("photo"), (req, res) => {
  const reqBody = JSON.parse(req.body.data);

  const newFileName = `POST-${new Date().getTime()}.${
    req.file.mimetype.split("/")[1]
  }`;

  S3Client.upload(
    {
      Bucket,
      Body: req.file.buffer,
      Key: newFileName,
    },
    async (err, data) => {
      if (err) throw err;

      try {
        const createPost = await Post.create({
          ...reqBody,
          photoURL: data.Location,
        });

        res.status(201).send({
          message: "Created Post",
          data: createPost,
        });
      } catch (e) {
        console.log(e);

        S3Client.deleteObject(
          {
            Bucket,
            Key: newFileName,
          },
          (err, data) => {
            if (err) throw err;
            console.log(data);
          }
        );

        res.status(500);
      }
    }
  );
});

router.get("/", async (req, res) => {
  try {
    let whereIncludeClause = whereIncludeClauseGenerator(req.query, models);
    const postFindAll = await Post.findAll(whereIncludeClause);

    res.status(200).send({
      message: "Get all posts",
      result: postFindAll,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let whereIncludeClause = whereIncludeClauseGenerator(req.query, models);

    const postFindById = await Post.findByPk(req.params.id, whereIncludeClause);

    res.status(200).send({
      message: "Get post by ID",
      result: postFindById,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(201).send({
      message: "Updated Post",
      result: editedPost,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.get("/:id/users", async (req, res) => {
  try {
    const { id } = req.params;
    const postFindUser = await Post.findByPk(id, {
      include: [{ model: User }],
    });

    res.status(200).send({
      message: "Get post with user",
      result: postFindUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

module.exports = router;
