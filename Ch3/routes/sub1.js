const express = require("express");
const router = express.Router();

router.get("/get1", (req, res) => {
  const uid = req.query.uid;

  res.render("sub1/get1", { uid: uid });
});

router.get("/get2", (req, res) => {
  const data = {
    name: req.query.name,
    age: req.query.age,
  };

  res.render("sub1/get2", data);
});

router.get("/post1", (req, res) => {
  res.render("sub1/post1");
});

router.get("/post2", (req, res) => {
  res.render("sub1/post2");
});

router.post("/post1Result", (req, res) => {
  const data = {
    uid: req.body.uid,
    pass: req.body.pass,
  };

  res.render("sub1/post1Result", data);
});

router.post("/post2Result", (req, res) => {
  const data = {
    uid: req.body.uid,
    pass: req.body.pass,
    hp: req.body.hp,
    age: req.body.age,
  };

  res.render("sub1/post2Result", data);
});

module.exports = router;
