var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { upload } = require("../middleware/hadleUpload");
const { adminOnly, verifyUser } = require("../middleware/AuthUser");

const { Tanaman } = require("../models");

const v = new Validator();

/* Get halaman tambah data tanaman*/
router.get("/addView", async (req, res) => {
  return res.render("addTanaman");
});
/* Create tanaman API*/
router.post("/", upload.single("img"), async (req, res) => {
  const plant = {
    name: req.body.name,
    kategori: req.body.kategori,
    lokasi: req.body.lokasi,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
    // img:req.body.img
  };
  try {
    const tanaman = await Tanaman.create(plant);
    res.redirect("/tanaman/adminEdit");
    // res.json({
    //   message: "create data tanaman succes ",
    //   data: tanaman,
    // });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
/* Create tanaman API*/
router.post("/api", upload.single("img"), async (req, res) => {
  const plant = {
    name: req.body.name,
    kategori: req.body.kategori,
    lokasi: req.body.lokasi,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
    // img:req.body.img
  };
  try {
    const tanaman = await Tanaman.create(plant);
    res.json({
      message: "create data tanaman succes ",
      data: tanaman,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
/* Get All tanaman View*/
router.get("/", async (req, res) => {
  const tanaman = await Tanaman.findAll();
  return res.render("tanaman", { tanaman });
  // return res.json(tanaman);
});

/* Get All tanaman View Admin*/
router.get("/adminEdit", async (req, res) => {
  const tanaman = await Tanaman.findAll();
  return res.render("tanamanAdmin", { tanaman });
  // return res.json(tanaman);
});
/* Get All tanaman API*/
router.get("/api", async (req, res) => {
  const tanaman = await Tanaman.findAll();
  return res.json(tanaman);
});
/* Get BY Id tanaman  View*/
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tanaman = await Tanaman.findByPk(id);
  if (!tanaman) {
    return res.json({ message: "plant not found" });
  }
  // res.json(tanaman);
  return res.render("tanamanDetil", { tanaman });
});
/* Get By Id tanaman API*/
router.get("/api/:id", async (req, res) => {
  const id = req.params.id;
  const tanaman = await Tanaman.findByPk(id);
  if (!tanaman) {
    return res.json({ message: "plant not found" });
  }
  res.json(tanaman);
});

/* get edit detil tanaman view admin*/
router.get("/edit/:id/", async (req, res) => {
  const id = req.params.id;
  const tanaman = await Tanaman.findByPk(id);
  if (!tanaman) {
    return res.json({ message: "Artikel tidak ada" });
  }
  res.render("halamanEditTanaman", { tanaman });
  // return res.json(tanaman);
});

/* Edit post tanaman view*/
router.post("/edit/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  let tanaman = await Tanaman.findByPk(id);

  if (!tanaman) {
    return res.json({ message: "plant not found" });
  }
  tanaman = await tanaman.update({
    name: req.body.name,
    kategori: req.body.kategori,
    lokasi: req.body.lokasi,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
  });
  res.redirect("/tanaman/adminEdit");
  // res.json({
  //   message: "update data tanaman succes ",
  //   data: tanaman,
  // });
  //  res.send('ok');
});
/* Edit tanaman API*/
router.put("/api/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  let tanaman = await Tanaman.findByPk(id);

  if (!tanaman) {
    return res.json({ message: "plant not found" });
  }
  tanaman = await tanaman.update({
    name: req.body.name,
    kategori: req.body.kategori,
    lokasi: req.body.lokasi,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
  });

  res.json({
    message: "update data tanaman succes ",
    data: tanaman,
  });
  //  res.send('ok');
});
/* Delete tanaman view */
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const tanaman = await Tanaman.findByPk(id);
  if (!tanaman) {
    return res.json({ message: "tanaman not found" });
  }
  await tanaman.destroy();
  res.redirect("/tanaman/adminEdit");
  // res.json({
  //   message: "tanaman is deleted",
  // });
});
/* Delete tanaman API*/
router.delete("/api/:id", async (req, res) => {
  const id = req.params.id;

  const tanaman = await Tanaman.findByPk(id);
  if (!tanaman) {
    return res.json({ message: "tanaman not found" });
  }
  await tanaman.destroy();
  res.json({
    message: "tanaman is deleted",
  });
});
module.exports = router;
