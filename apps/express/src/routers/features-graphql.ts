import { graphqlHTTP } from 'express-graphql';
import { SchemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { FeatureDocument, FeatureModel } from '../models/feature-model';

const featureTc = composeWithMongoose<FeatureDocument>(FeatureModel);

const featureQueries = {
  getById: featureTc.getResolver('findById'),
  getAll: featureTc.getResolver('findMany'),
};

const featureMutations = {
  add: featureTc.getResolver('createOne'),
  update: featureTc.getResolver('updateOne'),
};

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({ ...featureQueries });
schemaComposer.Mutation.addFields({ ...featureMutations });

const extensions = ({ context }: { context: { startTime: number } }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

const router = graphqlHTTP({
  context: { startTime: Date.now() },
  graphiql: true,
  schema: schemaComposer.buildSchema(),
  // extensions,
});

export const featuresGraphqlRouter = router;
