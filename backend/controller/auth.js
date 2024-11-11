import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const signUp= async(req,res)=>{
    const { username, password } = req.body;
    console.log(username, password);

  // 1. Check if the username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username is already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // 3. Create and save the new user
    const newUser = new User({
      username,
      password: hashedPassword, 
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const signin =async(req, res)=>{
    const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Token expiration time
    });
 
    res.json({ token, message: 'Signin successful!' });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


 export const verfyToken= async (req, res) => {
  // Get the token from the request headers (or body, depending on your setup)
  const token = req.headers.authorization?.split(" ")[1]; // Assumes 'Bearer <token>' format

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is valid, send success response with the decoded token data
    res.json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    // If token verification fails, send an unauthorized response
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};