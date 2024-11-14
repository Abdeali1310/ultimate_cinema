const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function forgotPassword(req, res) {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SignIn to The Ultimate Cinema without password',
      html: `<p>Click <a href="${resetLink}">here</a> to SignIn.</p>`,
    });

    res.json({ message: 'Password reset link has been sent to your email.' ,token:token});
  } catch (error) {
    res.status(500).json({ message: 'Error sending email' });
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { forgotPassword, resetPassword };
