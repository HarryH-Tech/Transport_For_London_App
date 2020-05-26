const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  signOut,
  requireSignIn,
} = require("../controllers/auth");

const { userSignUpValidator } = require("../validator");

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

router.get("/hello", requireSignIn, (req, res) => {
  res.send("Hello there");
});

module.exports = router;
