const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, userType, password } = req.body;

  if (!firstName || !lastName || !email || !userType || !password) {
    return res.status(422).json({ error: "Please fill the details properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res
        .status(409)
        .json({ message: "User with given email already exists" });

    const user = new User({ firstName, lastName, email, userType, password });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
