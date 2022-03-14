const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdTasks: [{
    title:{type : String},
    desc: {type: String}
  }],
  acceptedTasks: [{
    title:{type : String},
    desc: {type: String}
  }],
  pendingTasks: [{
    title:{type : String},
    desc: {type: String}
  }],
  rejectedTasks: [{
    title:{type : String},
    desc: {type: String}
  }],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('user',UserSchema)
module.exports = User;
