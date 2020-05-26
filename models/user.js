const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    hashedPassword: {
      type: String,
      required: true,
    },

    salt: String,

    role: {
      type: Number,
      default: 0,
    },

    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Virtual Field
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashedPassword = this.encryptPassword(password);
  })

  .get(() => {
    return this._password;
  });

//Authenticate Login Attempt
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
