const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  // validation for username is added in the schema
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: String,
  passwordHash: String,
});

// returnedObject by the database is modified to show relevant documents and converted to JSON
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

// uniqueValidator library must be plugin for it to work
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
