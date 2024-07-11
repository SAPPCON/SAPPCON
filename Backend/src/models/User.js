const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      len: [8, 100],
    },
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true
  },
  alias: {
    type: String,
    allowNull: true
  },
  address: {
    type: String,
    allowNull: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
});

module.exports = mongoose.model("User", UserSchema);