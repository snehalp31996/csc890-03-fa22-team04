const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userType: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  feedbacks: [
    {
      email: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      feedback: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//store data
userSchema.methods.addFeedback = async function (
  email,
  question,
  answer,
  feedback
) {
  try {
    this.feedbacks = this.feedbacks.concat({
      email,
      question,
      answer,
      feedback,
    });
    await this.save();
    return this.feedbacks;
  } catch (error) {
    console.log(error);
  }
};

//user model
const User = mongoose.model("USER", userSchema);

module.exports = User;
