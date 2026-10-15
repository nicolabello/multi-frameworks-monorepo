import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { featuresGraphql, graphqlEndpoint } from './routers/features-graphql.js';
import { featuresRouter } from './routers/features.js';

// Express recognises error-handling middleware by its 4 arguments (error, req, res, next).
// https://expressjs.com/en/guide/error-handling.html
const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // Documents rejected by the schema validators (see models/feature-model.ts) are the client's fault
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.fromEntries(Object.entries(error.errors).map(([path, e]) => [path, e.message]));
    res.status(400).json({ errors });
    return;
  }

  // Errors raised by middleware such as `express.json()` (e.g. malformed JSON) carry their own 4xx status
  const status = typeof error?.status === 'number' ? error.status : 500;
  if (status >= 500) {
    console.error(error);
  }
  res
    .status(status)
    .json({ message: status < 500 && error instanceof Error ? error.message : 'Unexpected error' });
};

// Building the app in a function (instead of listening straight away) lets the tests
// drive it with supertest without opening a real port.
export function createApp() {
  return (
    express()
      // Allow the front-ends (served from other ports, i.e. other origins) to call the API.
      // `cors()` with no options allows every origin: fine for local development only.
      // https://expressjs.com/en/resources/middleware/cors.html
      .use(cors())
      // Parse JSON request bodies into `req.body`: https://expressjs.com/en/api.html#express.json
      .use(express.json())
      .use('/features', featuresRouter)
      .use(graphqlEndpoint, featuresGraphql)
      // Must be registered last, after all the routes
      .use(errorHandler)
  );
}
