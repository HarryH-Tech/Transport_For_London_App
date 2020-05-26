exports.userSignUpValidator = (req, res, next) => {
  req.check("username", "Username Required").notEmpty();

  req
    .check("email", "Email must be between 3 and 32 characters")
    //check that user input is an email address
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });

  req.check("password", "Password Required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")
    //check password has at least 1 digit
    .matches(/\d/)
    .withMessage("Password must contain a number.");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
