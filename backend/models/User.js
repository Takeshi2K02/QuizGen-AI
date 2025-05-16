import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local',
  },
  profile: {
    name: String,
    avatar: String,
  },
  resetToken: String,
  resetTokenExpires: Date,
});

const User = mongoose.model('User', userSchema);
export default User;