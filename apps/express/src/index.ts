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

  server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    next();
  });

  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server.use('/features', featuresRouter);

  server.listen(port);

  console.log(`Server listening on port ${port}`);
}

start();
