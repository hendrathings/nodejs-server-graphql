const { User } = require("../../models/User");

const users = () =>
  User.find().then(_users => _users, e => console.log("Error:", e));

module.exports = { users };
