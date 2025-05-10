import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  // Get the token from the cookies or headers (depending on where it's stored)
  let token = req.cookies?.token;  // If you're using cookies

  // If token is not found in cookies, check the Authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]; // Get token from "Bearer <token>"
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach the decoded data to req.user (e.g., user ID, username)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
