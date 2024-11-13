import jwt from "jsonwebtoken";
import User from "./user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("Loaded JWT_SECRET:", JWT_SECRET);

const admin = async (req, res) => {
  const { username, password } = req.body;

  console.log("Request body:", req.body);

  if (!username || !password) {
    console.error("Missing username or password");
    return res.status(400).json({ message: "Username and password are required" });
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

export { admin };
