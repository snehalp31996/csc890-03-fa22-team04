const router = require("express").Router();
const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const e = require("express");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter correct details" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log("token from auth");
      console.log(token);

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User Signin Successful!" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

//code to Text page after login

router.get("/codeToText", authenticate, (req, res) => {
  console.log("After authenticate");
  console.log(req.body);
  res.send(req.rootUser);
});

// for logout
router.get("/logout", async (req, res) => {
  console.log(`Hello my logout page`);
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User Logout");
});

//add feedback
router.post("/codeToText", authenticate, async (req, res) => {
  const { email, question, answer, feedback } = req.body;
  if (!email || !question || !answer || !feedback) {
    return res.status(422).json({ error: "Please fill the form" });
  }
  try {
    const userFeedbackForm = await User.findOne({ _id: req.userID });
    if (userFeedbackForm) {
      await userFeedbackForm.addFeedback(email, question, answer, feedback);

      await userFeedbackForm.save();

      res.status(201).json({ message: "user feedback successful" });
    }
  } catch (error) {}
});
module.exports = router;
