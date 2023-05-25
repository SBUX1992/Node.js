const mongoose = require("mongoose");

const { Schema } = mongoose;

const user1Schema = new Schema({
  uid: { type: String, require: true },
  name: { type: String, require: true },
  hp: { type: String },
  age: { type: Number },
});

module.exports = mongoose.model("User1", user1Schema);
