const router = require("express").Router();
const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const e = require("express");

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter correct details" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      // console.log("token from auth");
      // console.log(token);

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

router.get("/getUserType", authenticate, async (req, res) => {
  try {
    const loggedInUser = req.rootUser;
    // console.log("loggedInUser", loggedInUser);
    if (loggedInUser) {
      req.user = loggedInUser;
      res.send(req.user);
    }
  } catch (error) {
    console.log("Error", error);
  }
});

//code to Text page after login

router.get("/codeToText", authenticate, (req, res) => {
  // console.log("After authenticate");
  // console.log(req.body);
  res.send(req.rootUser);
});

//code to text add feedback
router.post("/codeToText", authenticate, async (req, res) => {
  const { email, question, answer, feedback, userRating } = req.body;
  if (!email || !question || !answer || !feedback || !userRating) {
    return res.status(422).json({ error: "Please add all the details" });
  }
  try {
    const userFeedbackForm = await User.findOne({ _id: req.userID });
    if (userFeedbackForm) {
      await userFeedbackForm.addFeedback(
        email,
        question,
        answer,
        feedback,
        userRating
      );

      await userFeedbackForm.save();

      res.status(201).json({ message: "User feedback successful" });
    }
  } catch (error) {}
});

// Text to Code page after login
router.get("/textToCode", authenticate, (req, res) => {
  // console.log("After authenticate");
  // console.log(req.body);
  res.send(req.rootUser);
});

// Text to Code add feedback
router.post("/textToCode", authenticate, async (req, res) => {
  const { email, question, answer, feedback, userRating } = req.body;
  // console.log("Inside Auth", userRating);
  if (!email || !question || !answer || !feedback || !userRating) {
    return res.status(422).json({ error: "Please add all the details" });
  }
  try {
    const userFeedbackForm = await User.findOne({ _id: req.userID });
    if (userFeedbackForm) {
      await userFeedbackForm.addFeedback(
        email,
        question,
        answer,
        feedback,
        userRating
      );

      await userFeedbackForm.save();

      res.status(201).json({ message: "User feedback successful" });
    }
  } catch (error) {}
});

// Code to Code page after login
router.get("/codeToCode", authenticate, (req, res) => {
  // console.log("After authenticate");
  // console.log(req.body);
  res.send(req.rootUser);
});

// Code to Code add feedback
router.post("/codeToCode", authenticate, async (req, res) => {
  const { email, question, answer, feedback, userRating } = req.body;
  if (!email || !question || !answer || !feedback || !userRating) {
    return res.status(422).json({ error: "Please add all the details" });
  }
  try {
    const userFeedbackForm = await User.findOne({ _id: req.userID });
    if (userFeedbackForm) {
      await userFeedbackForm.addFeedback(
        email,
        question,
        answer,
        feedback,
        userRating
      );

      await userFeedbackForm.save();

      res.status(201).json({ message: "User feedback successful" });
    }
  } catch (error) {}
});

// Get feedback
router.get("/feedback", authenticate, async (req, res) => {
  try {
    const userFeedback = await User.find({}, { feedbacks: 1, _id: 0 });
    if (userFeedback) {
      // console.log("userFeedback: ", userFeedback);
      // res.status(201).json({ message: "User feedback retrieved successfully" });
      req.userFeedback = userFeedback;
      res.send(req.userFeedback);
    }
  } catch (error) {}
});

// for logout
router.get("/logout", async (req, res) => {
  console.log(`Hello my logout page`);
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
