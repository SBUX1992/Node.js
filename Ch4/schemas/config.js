const mongoose = require("mongoose");

const connect = () => {
  // 개발 환경에서 쿼리 확인
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  mongoose
    .connect("mongodb://root:1234@127.0.0.1:27017/admin", {
      dbName: "java1db",
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("mongDB 연결 성공");
    })
    .catch((err) => {
      console.log("mongDB 연결 에러", err);
    });
};

mongoose.connection.on("error", (err) => {
  console.log("mongoDB 연결 에러", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB 연결 종료 ... 연결 재시도 ...");
  connect();
});

module.exports = connect;
