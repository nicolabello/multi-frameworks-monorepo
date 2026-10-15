import { SchemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { createYoga } from 'graphql-yoga';
import type { Document, Model } from 'mongoose';
import { FeatureModel } from '../models/feature-model.js';

const schemaComposer = new SchemaComposer();
// graphql-compose-mongoose's typings predate Mongoose 9's inferred models, hence the cast.
const FeatureTC = composeMongoose(FeatureModel as unknown as Model<Document>, { schemaComposer });

schemaComposer.Query.addFields({
  getById: FeatureTC.mongooseResolvers.findById(),
  getAll: FeatureTC.mongooseResolvers.findMany(),
});

schemaComposer.Mutation.addFields({
  add: FeatureTC.mongooseResolvers.createOne(),
  update: FeatureTC.mongooseResolvers.updateById(),
});

export const graphqlEndpoint = '/graphql/features';

// GraphiQL is served on the same URL when opened in a browser.
export const featuresGraphql = createYoga({
  schema: schemaComposer.buildSchema(),
  graphqlEndpoint,
});
