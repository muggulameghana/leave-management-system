const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || "7d" });
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "Registered successfully", token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid email or password" });
    res.json({ message: "Login successful", token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
module.exports = { signup, login };
