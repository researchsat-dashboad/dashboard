import express from 'express';
import cors from 'cors';
import missionRouter from './routes/mission_routes.js';

// Create instance of express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// User CORS
app.use(cors());

// Use mission_routes.js
app.use('/mission', missionRouter);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line
  console.log('Listening on port ' + process.env.PORT);
});
