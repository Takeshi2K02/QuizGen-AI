import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// User Signup
export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔐 Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log('Password reset link:', resetLink);

    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔄 Reset Password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashed = await bcrypt.hash(newPassword, 12);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};