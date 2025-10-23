const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  avatar: { type: String, default: '' },
  addresses: [
    {
      name: String,
      phone: String,
      addressLine: String,
      city: String,
      postalCode: String,
      default: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
