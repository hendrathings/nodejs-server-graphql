const { User } = require("../../models/User");
const { SHA256 } = require("crypto-js");
const validator = require("validator");

const createUser = async (obj, args, context) => {
  if (!validator.isEmail(args.input.email))
    return new Error("email is not valid");

  if (!validator.isByteLength(args.input.username, { min: 8, max: undefined }))
    return new Error("username min length 8");

  const userByUsername = await User.find({ username: args.input.username });
  if (userByUsername.length > 0) return new Error("username already taken");

  const userByEmail = await User.find({ email: args.input.email });
  if (userByEmail.length > 0) return new Error("email address already taken");

  const newUser = new User({
    username: args.input.username,
    password: SHA256(args.input.password),
    email: args.input.email,
    fullname: args.input.fullname
  });

  newUser.save();
  return newUser;
};

const updateUser = async (obj, args, context) => {
  if (!validator.isEmail(args.input.email))
    return new Error("email is not valid");

  const userByEmail = await User.find({ email: args.input.email });
  if (userByEmail.length > 0) return new Error("email address already taken");

  const currentUser = await User.findByIdAndUpdate(
    args.id,
    { $set: args.input },
    { new: true }
  );
  return currentUser;
};

const updateUsername = async (obj, args, context) => {
  if (!validator.isByteLength(args.input.username, { min: 8, max: undefined }))
    return new Error("username min length 8");

  const userByUsername = await User.find({ username: args.input.username });
  if (userByUsername.length > 0) return new Error("username already taken");

  const currentUser = await User.findByIdAndUpdate(
    args.id,
    { $set: args.input },
    { new: true }
  );
  return currentUser;
};

const updatePassword = async (obj, args, context) => {
  const currentUser = await User.findByIdAndUpdate(
    args.id,
    { $set: { password: SHA256(args.input.password) } },
    { new: true }
  );
  return currentUser;
};

const deleteUser = async (obj, args, context) => {
  const currentUser = await User.findByIdAndRemove(args.id);
  return currentUser;
};

module.exports = {
  createUser,
  updateUser,
  updateUsername,
  updatePassword,
  deleteUser
};
