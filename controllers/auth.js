const User = require("../models/user");
const jwt = require("jsonwebtoken"); //generates signed token
const expressJwt = require("express-jwt"); //for authrozation check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashedPassword = undefined;
    res.json({
      user,
    });
  });
};

exports.signIn = (req, res) => {
  //find user from email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist, please sign up.",
      });
    }
    //If user found ensure username and pw match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    //generate signed token with user id and secret
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    //persist token as "t" in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    //return res with user + token to frontend
    const { _id, username, email, role } = user;
    return res.json({ token, user: { _id, email, username, role } });
  });
};

exports.signOut = (req, res) => {
  //clear cookie
  res.clearCookie("t");
  res.json({
    message: "Sign Out Success",
  });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile_id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};
