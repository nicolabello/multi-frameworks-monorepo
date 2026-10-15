import { type Feature, isFeatureValueType } from '@feature-toggles/helpers';
import { model, Schema } from 'mongoose';

export type FeatureDocument = Omit<Feature, '_id'>;

const schema = new Schema<FeatureDocument>({
  key: { type: String, required: true },
  description: { type: String, default: '' },
  type: {
    type: String,
    validate: { validator: isFeatureValueType, message: 'Value not allowed' },
  },
  value: Schema.Types.Mixed,
});

export const FeatureModel = model('Feature', schema, 'features');
