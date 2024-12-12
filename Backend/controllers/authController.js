const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordHash');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate required fields
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const hashedPassword = await hashPassword(password); // Hash password

    // Insert into the database
    await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};

// Login logic
exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if all fields are provided
  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Fetch the user from the database
    const user = await User.findByUsername(username);
    console.log('Fetched user:', user); // Log the fetched user
    if (!user || user.role !== role) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare the password
    const isPasswordValid = await comparePassword(password, user.password);
    console.log('Password valid:', isPasswordValid); // Log the password comparison result
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token
    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};