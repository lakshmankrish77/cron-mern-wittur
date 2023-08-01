const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    password: {
      type: String,
      required: [true, "Please enter the user password"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email Id"],
      unique: [true, "Email Id already taken"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
