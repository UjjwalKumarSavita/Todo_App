// middleware/verifyToken.js

import jwt from 'jsonwebtoken';

// Secret key for JWT (use an environment variable in production)
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const verifyToken = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization?.split(" ")[1]; 
  console.log(token);
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    console.log("bhsdk");
    
    // Verify token and attach decoded info to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    req.userId = decoded.userId; // decoded contains user info, like id

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};


