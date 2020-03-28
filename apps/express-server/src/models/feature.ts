import mongoose from 'mongoose';

interface FeatureInterface extends mongoose.Document {
  name: string;
  value?: boolean;
}

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: Boolean,
});

export const Feature = mongoose.model<FeatureInterface>(
  'feature',
  FeatureSchema,
  'features'
);
