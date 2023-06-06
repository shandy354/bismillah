var express = require("express");
var router = express.Router();
const argon2 = require("argon2");

const { User } = require("../models");

/* Login users API*/
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.id = user.id;
  const username = user.username;
  const role = user.role;
  res.status(200).json({ username, role });
  //   res.json({
  //     message: "create user succes ",
  //     data: user,
  //   });
});

/* login view*/
router.post("/loginView", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.render("AdminLogin");
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.render("AdminLogin");
  req.session.id = user.id;
  const username = user.username;
  const role = user.role;
  return res.redirect("/homeAdmin");
  //   res.json({
  //     message: "create user succes ",
  //     data: user,
  //   });
});

/* Delete users API*/
router.delete("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
});
module.exports = router;
