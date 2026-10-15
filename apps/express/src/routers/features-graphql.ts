import { SchemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { createYoga } from 'graphql-yoga';
import type { Document, Model } from 'mongoose';
import { FeatureModel } from '../models/feature-model.js';

// graphql-compose builds a GraphQL schema in code, and graphql-compose-mongoose derives the
// GraphQL types and CRUD resolvers from the Mongoose model, so nothing is written by hand.
// https://graphql-compose.github.io/docs/plugins/plugin-mongoose.html
const schemaComposer = new SchemaComposer();

// graphql-compose-mongoose's typings predate Mongoose 9's inferred models, hence the cast.
// It also validates with `validateSync()`, which makes Mongoose log a deprecation warning (removed in Mongoose 10).
// That comes from the library, not this code: it needs an upstream update before upgrading to Mongoose 10.
const FeatureTC = composeMongoose(FeatureModel as unknown as Model<Document>, { schemaComposer });

schemaComposer.Query.addFields({
  getById: FeatureTC.mongooseResolvers.findById(),
  getAll: FeatureTC.mongooseResolvers.findMany(),
});

// Both mutations go through `save()`, so the model's validation hook applies to them too
schemaComposer.Mutation.addFields({
  add: FeatureTC.mongooseResolvers.createOne(),
  update: FeatureTC.mongooseResolvers.updateById(),
});

export const graphqlEndpoint = '/graphql/features';

// GraphQL Yoga is a spec-compliant GraphQL server that plugs into Express as middleware.
// It also serves the GraphiQL IDE when the endpoint is opened in a browser.
// https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-express
export const featuresGraphql = createYoga({
  schema: schemaComposer.buildSchema(),
  graphqlEndpoint,
});
