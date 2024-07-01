import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import missionRouter from './routes/mission_routes.js';
import connectDB from './db.js';
import readCSVFromS3 from './readS3AndStore.js';

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

// This route will check for any new files in AWS S3 and transfer the data to MongoDB
app.get('/process-data', (req, res) => {
  readCSVFromS3();
  res.send('Data processing started.');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ' + PORT);
});
