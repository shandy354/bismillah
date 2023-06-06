var express = require("express");
var router = express.Router();
const argon2 = require("argon2");

const { User } = require("../models");

/*  View login */
router.get("/viewLogin", async (req, res) => {
  return res.render("AdminLogin");
});

/* PUT users API */
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let user = await User.findByPk(id);

  if (!user) {
    return res.json({ message: "user not found" });
  }
  const schema = {
    username: "string|optional",
    password: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.lenght) {
    return res.status(400).json(validate);
  }

  user = await user.update(req.body);
  res.json(user);
  //  res.send('ok');
});

/* PUT users API */
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let user = await User.findByPk(id);

  if (!user) {
    return res.json({ message: "user not found" });
  }
  const { username, password, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  user = await user.update({
    username: username,
    password: hashPassword,
    role: role,
  });
  res.json({
    message: "update user succes ",
    data: user,
  });
  //  res.send('ok');
});

/* Create users API*/
router.post("/", async (req, res) => {
  const { username, password, role } = req.body;
  const hashPassword = await argon2.hash(password);

  const user = await User.create({
    username: username,
    password: hashPassword,
    role: role,
  });
  res.json({
    message: "create user succes ",
    data: user,
  });
});

/* Get ALL users API*/
router.get("/", async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});
/* Get BY Id users API*/
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const users = await User.findByPk(id);
  if (!users) {
    return res.json({ message: "user not found" });
  }
  res.json(users);
});

/* Delete users API*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const users = await User.findByPk(id);
  if (!users) {
    return res.json({ message: "user not found" });
  }
  await users.destroy();
  res.json({
    message: "user is deleted",
  });
});
module.exports = router;
