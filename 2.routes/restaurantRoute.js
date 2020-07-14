const express = require("express");
const { Router } = express;
let {
  Sequelize,
  sequelize,
  User,
  Comment,
  Like,
  Post,
  Restaurant,
} = require("../models");
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

    const restaurantFindAll = await Restaurant.findAll(whereIncludeClause);

    res.status(200).send({
      message: "Get all restaurants",
      result: restaurantFindAll,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const restaurantFindAll = await Restaurant.create({
      ...req.body,
    });

    res.status(201).send({
      message: "Create restaurant",
      result: restaurantFindAll,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
