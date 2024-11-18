import jwt from "jsonwebtoken";
import User from "./user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // Import bcrypt
// Load environment variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
//console.log("Loaded JWT_SECRET:", JWT_SECRET);
const admin = async (req, res) => {
  const { username, password } = req.body;
  console.log("Request body:", req.body);
  if (!username || !password) {
    console.error("Missing username or password");
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    // Check if the user exists
    const admin = await User.findOne({ username });
    console.log("User found:", admin);

    if (!admin) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (admin.password !== password) {
      console.error("Incorrect password");
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check if JWT_SECRET is properly loaded
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    // Generate the JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Token generated:", token);

    res.status(200).json({
      message: "Admin authenticated",
      token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error during authentication:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password, username });
    console.log("New user:", newUser);
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // More detailed logging for server-side issues
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    //  Compare the plain text password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "User authenticated",
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

export { admin, userRegister, userLogin };
