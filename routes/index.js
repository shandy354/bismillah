var express = require("express");
var router = express.Router();

const { Artikel } = require("../models");
// const { adminOnly, verifyUser } = require("../middleware/AuthUser");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const artikel = await Artikel.findAll();
  res.render("index", { artikel });
});

/* Login get home */
router.get("/homeAdmin", async (req, res, next) => {
  const artikel = await Artikel.findAll();
  res.render("homeAdmin", { artikel });
});

module.exports = router;
