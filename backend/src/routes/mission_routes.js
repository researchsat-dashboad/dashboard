import express from 'express';
import dotenv from 'dotenv';
import SensorData from '../models/SensorData.js';

// Imports variables from .env file
dotenv.config();

const router = express.Router();

// Get all data request route
router.get('/data', async (request, response) => {
  try {
    // Retrieve all data points in descending order
    const sensorData = await SensorData.find().sort({ dateTime: -1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all temperature data
router.get('/data/temp', async (request, response) => {
  try {
    // Retrieve temperature data points in ascending order
    const sensorData = await SensorData.find({}, ['temperature', 'dateTime']).sort({ dateTime: 1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all spect data
router.get('/data/spect', async (request, response) => {
  try {
    // Retrieve temperature data points in ascending order
    const sensorData = await SensorData.find({}, ['spectV', 'spectB', 'spectG', 'spectY', 'spectD', 'spectR', 'dateTime']).sort({ dateTime: 1 });
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
