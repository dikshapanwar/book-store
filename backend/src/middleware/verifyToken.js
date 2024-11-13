import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log("Loaded JWT_SECRET:", JWT_SECRET);

const verifyToken = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1];
  if(!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

export default verifyToken;