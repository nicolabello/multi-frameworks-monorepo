import mongoose from 'mongoose';
import { Feature, featureValueTypes } from '@feature-toggles/helpers';

interface FeatureDocument extends mongoose.Document, Feature {
}

const schema = new mongoose.Schema<FeatureDocument>({
  key: { type: String, required: true },
  description: String,
  type: {
    type: String,
    validate: (value: string): boolean => featureValueTypes.indexOf(value) > -1,
  },
  value: Object,
});

export const FeatureModel = mongoose.model<FeatureDocument>(
  'Feature',
  schema,
  'features'
);
