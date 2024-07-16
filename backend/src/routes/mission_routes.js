import express from 'express';
import dotenv from 'dotenv';
import SensorData from '../models/SensorData.js';

// Imports variables from .env file
dotenv.config();

const router = express.Router();

// Get all data request route
router.get('/data', async (request, response) => {
  // Add limiter to query i.e. /mission/data?limit=50 will only return 50 latest data points
  const limit = parseInt(request.query.limit);
  try {
    // Retrieve all data points in descending order
    const sensorData = await SensorData.find().sort({ dateTime: -1 }).limit(limit);

    const latestSensorData = sensorData.reverse();
    response.json(latestSensorData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all temperature data
router.get('/data/temperature', async (request, response) => {
  try {
    // Retrieve temperature data points in ascending order
    const sensorData = await SensorData.find({}, ['temperature', 'dateTime']).sort({ dateTime: 1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all humidity data
router.get('/data/humidity', async (request, response) => {
  try {
    // Retrieve temperature data points in ascending order
    const sensorData = await SensorData.find({}, ['humidity', 'dateTime']).sort({ dateTime: 1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all spect data
router.get('/data/spect', async (request, response) => {
  try {
    // Retrieve temperature data points in ascending order
    const sensorData = await SensorData.find({}, [
      'spectV',
      'spectB',
      'spectG',
      'spectY',
      'spectD',
      'spectR',
      'dateTime'
    ]).sort({ dateTime: 1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all pressure data
router.get('/data/pressure', async (request, response) => {
  try {
    // Retrieve pressure data points in ascending order
    const sensorData = await SensorData.find({}, ['pressure', 'dateTime']).sort({ dateTime: 1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all acceleration data
router.get('/data/acceleration', async (request, response) => {
  try {
    // Retrieve pressure data points in ascending order
    const sensorData = await SensorData.find({}, ['acx', 'acy', 'acz', 'signal', 'dateTime']).sort({
      dateTime: 1
    });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
