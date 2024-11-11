import express from 'express';
import { signin, signUp, verfyToken } from '../controller/auth.js';

const router = express.Router();

// Define routes
router.post('/signup', signUp);

router.post('/signin', signin);
router.post('/verifytoken', verfyToken);

const authRouter= router
export default authRouter; 