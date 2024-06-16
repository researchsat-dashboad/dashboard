import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import missionRouter from './routes/mission_routes.js';
import connectDB from './db.js';

// Imports variables from .env file
dotenv.config({ path: '../.env' });

// Create instance of express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use CORS
app.use(cors());

connectDB();

// Use mission_routes.js
app.use('/mission', missionRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Listening on port ' + PORT);
});
