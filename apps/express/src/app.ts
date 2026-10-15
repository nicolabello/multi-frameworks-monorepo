import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { featuresGraphql, graphqlEndpoint } from './routers/features-graphql.js';
import { featuresRouter } from './routers/features.js';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
};

export function createApp() {
  return express()
    .use(cors())
    .use(express.json())
    .use('/features', featuresRouter)
    .use(graphqlEndpoint, featuresGraphql)
    .use(errorHandler);
}
