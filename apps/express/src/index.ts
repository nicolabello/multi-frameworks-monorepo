import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { featuresRouter } from './routers/features';

async function start(): Promise<void> {
  dotenv.config();

  const dbUri = process.env.DB_URI || '';
  const port = process.env.PORT || 8080;

  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server.use('/api/features', featuresRouter);

  server.listen(port);

  console.log(`Server listening on port ${port}`);
}

start();
