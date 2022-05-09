const router = require("express").Router();
const User = require("../models/User");
const bcyrpt = require("bcrypt");
router.post("/register", async (req, res) => {
  try {
    // generates new password
    const salt = await bcyrpt.genSalt(10);
    const hashedPassword = await bcyrpt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    console.log("hi");
  }

});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcyrpt.compare(req.body.password,user.password);
    !validPassword && res.status(400).json("Wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
