const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  userid: { type: String, default: () => crypto.randomUUID() },
  name: { type: String, min: 3, max: 100 },
  email: { type: String, required: true, min: 5, max: 255 },
  password: { type: String },
  profile: { type: String },
  cpassword: { type: String },
  disable: {
    type: Boolean,
    default: true
  }
});


usersSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("users", usersSchema);
