import express from 'express';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { sensor_data } from '../../sample_data.js';

// Imports variables from .env file
dotenv.config();

const router = express.Router();

// Get request route
router.get('/', (req, res) => {
  // Configure AWS parameters
  AWS.config.update({
    // Bucket parameters
    region: process.env.BUCKET_REGION,
    credentials: new AWS.Credentials({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SACCESS_KEY
    })
  });

  const s3 = new AWS.S3();
  // Params to select the specified bucket
  const params = {
    Bucket: process.env.BUCKET_NAME
  };

  // Command to listObjects from specified bucket
  s3.listObjectsV2(params, (err) => {
    if (err) {
      // Send error message if error occurs
      res.status(404).send({ error: 'Error retrieving data' });
    } else {
      // Send data a response
      // res.send(data.Contents)
      res.send({ sensor_data });
    }
  });
});

export default router;
