var express = require("express");
const { User } = require("../models");

const verifyUser = async (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const id = req.params.id;
  const users = await User.findOne(id);
  if (!users) return res.status(404).json({ msg: "User tidak ditemukan" });
  // name: req.body.name,
  // req.id = users.id;
  // req.username = users.username;
  req.role = users.role;
  return next();
};
const adminOnly = async (req, res, next) => {
  const user = await User.findOne();
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
module.exports = { verifyUser, adminOnly };
