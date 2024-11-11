
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import cors from 'cors'
import todoRouter from './routes/todo.js';


const app = express();
app.use(express.json());

const allowedOrigins = ['https://w3todo.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected to database....");
  } catch (error) {
    console.log("Connection failed", error);
  }
}

app.use('/auth',authRouter);
app.use('/todo',todoRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express with ES6 Modules!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
