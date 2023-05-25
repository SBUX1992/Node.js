var express = require("express");
const User1 = require("../schemas/user1");
var router = express.Router();

// 목록
router.get("/list", async (req, res) => {
  // DB 당겨오기 (async, await 함께 선언해야함)
  const users = await User1.find();

  console.log(users);
  // {} 해줘야 참조해서 불러옴
  res.render("user1/list", { users });
});

// 등록하기 get
router.get("/register", (req, res) => {
  res.render("user1/register");
});

// 등록하기 post
router.post("/register", async (req, res) => {
  //   register에서 데이터 넘어가는지 확인
  //   const user = req.body;
  //   console.log(user);
  //   res.redirect("/user1/list");

  //   const user = req.body;

  // mongoDB Insert
  const user = await User1.create({
    uid: req.body.uid,
    name: req.body.name,
    hp: req.body.hp,
    age: req.body.age,
  });

  console.log(user);

  res.redirect("/user1/list");
});

// 수정하기 get
router.get("/modify", async (req, res) => {
  const _id = req.query._id;
  console.log("_id : ", _id);

  const user = await User1.findById(_id);
  console.log("user : ", user);

  // {} 해줘야 참조해서 불러옴
  res.render("user1/modify", { user });
});

// 수정하기 post
router.post("/modify", async (req, res) => {
  // javascript 구조 할당
  const { _id, uid, name, hp, age } = req.body;

  // schemas의 user1
  await User1.findByIdAndUpdate(_id, { name, hp, age });

  res.redirect("/user1/list");
});

// 삭제하기
router.get("/delete", async (req, res, next) => {
  const { _id } = req.query;
  //console.log(_id);
  await User1.deleteOne({ _id: _id });
  res.redirect("/user1/list");
});

module.exports = router;
