var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { upload } = require("../middleware/hadleUpload");
const { adminOnly, verifyUser } = require("../middleware/AuthUser");

const { Artikel } = require("../models");

const v = new Validator();

/* view*/
router.get("/", async (req, res) => {
  const artikel = await Artikel.findAll();
  return res.render("index", { artikel });
  // return res.json(tanaman);
});
/* get halaman add artikel*/
router.get("/addView", async (req, res) => {
  return res.render("addArtikelHome");
});
/* Create Artikel view*/
router.post("/", upload.single("img"), async (req, res) => {
  const artikel = {
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
  };
  try {
    const artikels = await Artikel.create(artikel);
    res.redirect("/homeAdmin");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/* Create Artikel API*/
router.post("/api", upload.single("img"), async (req, res) => {
  const artikel = {
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
    // img: req.file.filename
    // img:req.body.img
  };
  try {
    const artikels = await Artikel.create(artikel);
    res.json({
      message: "create data di artikel home ",
      data: artikels,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/* Get All Artikel API*/
router.get("/api", async (req, res) => {
  const artikel = await Artikel.findAll();
  return res.json(artikel);
});
/* Get By Id Artikel API*/
router.get("/api/:id", async (req, res) => {
  const id = req.params.id;
  const artikel = await Artikel.findByPk(id);
  if (!artikel) {
    return res.json({ message: "Artikel tidak ada" });
  }
  res.json(artikel);
});
/*view halaman edit artikel*/
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const artikel = await Artikel.findByPk(id);
  if (!artikel) {
    return res.json({ message: "Artikel tidak ada" });
  }
  res.render("editArtikelHome", { artikel });
  // res.json(artikel);
});

// view post edit

router.post("/edit/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  let artikel = await Artikel.findByPk(id);

  if (!artikel) {
    return res.json({ message: "Artikel tidak ada" });
  }
  artikel = await artikel.update({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
  });
  res.redirect("/homeAdmin");
  // res.json({
  //   message: "update data artikel Home ",
  //   data: artikel,
  // });
});
/* Edit Artikel API*/
router.put("/api/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  let artikel = await Artikel.findByPk(id);

  if (!artikel) {
    return res.json({ message: "Artikel tidak ada" });
  }
  artikel = await artikel.update({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    img: req.file.filename,
  });
  res.json({
    message: "update data artikel Home ",
    data: artikel,
  });
  //  res.send('ok');
});
/* Delete ArtikelI View*/
router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;

  const artikel = await Artikel.findByPk(id);
  if (!artikel) {
    return res.json({ message: "Artikel Tidak ada" });
  }
  await artikel.destroy();
  res.redirect("/homeAdmin");
});
/* Delete Artikel API*/
router.delete("/api/:id", async (req, res) => {
  const id = req.params.id;

  const artikel = await Artikel.findByPk(id);
  if (!artikel) {
    return res.json({ message: "Artikel Tidak ada" });
  }
  await artikel.destroy();
  res.json({
    message: "Artikel hapus",
  });
});
module.exports = router;
