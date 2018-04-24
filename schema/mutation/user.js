const { User } = require("../../models/User");
const { SHA256 } = require("crypto-js");
const validator = require("validator");

const createUser = async (obj, args, context) => {
  if (!validator.isEmail(args.input.email))
    return new Error("email is not valid");

  if (!validator.isByteLength(args.input.username, { min: 8, max: undefined }))
    return new Error("username min length 8");

  const users = await User.find({ username: args.input.username });
  if (users.length > 0) return new Error("username already taken");

  const newUser = new User({
    username: args.input.username,
    password: SHA256(args.input.password),
    email: args.input.email,
    fullname: args.input.fullname
  });

  newUser.save();
  return newUser;
};

module.exports = { createUser };
