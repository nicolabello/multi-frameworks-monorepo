import { castFeatureValue, type Feature, isFeatureValueType } from '@feature-toggles/helpers';
import { model, Query, Schema } from 'mongoose';

/** What is stored in MongoDB: a Feature without the client-side `_id` string (Mongo generates an ObjectId). */
export type FeatureDocument = Omit<Feature, '_id'>;

// A Mongoose schema describes the shape of the documents in a collection and how to validate them.
// https://mongoosejs.com/docs/guide.html
//
// The validators mirror `validateFeature` from @feature-toggles/helpers (same rules, same messages), so the
// GraphQL mutations — which write through Mongoose without going through the REST router — are validated too.
// They are path validators rather than `pre('validate')` middleware on purpose: graphql-compose-mongoose
// validates with `validateSync()`, which doesn't run middleware.
// https://mongoosejs.com/docs/validation.html
const schema = new Schema<FeatureDocument>({
  key: { type: String, required: [true, 'This is required'] },
  description: { type: String, default: '' },
  type: {
    type: String,
    required: [true, 'This is required'],
    // Custom validators: https://mongoosejs.com/docs/validation.html#custom-validators
    validate: { validator: isFeatureValueType, message: 'Value not allowed' },
  },
  // `Mixed` accepts anything (string, number, boolean…): the value's type depends on the `type` field.
  // https://mongoosejs.com/docs/schematypes.html#mixed
  value: {
    type: Schema.Types.Mixed,
    required: [true, 'Does not match the type'],
    validate: {
      // When validating a document `this` is that document, so the value can be checked against its `type`.
      // (`this` is a Query for update validators, which this app doesn't use.)
      validator(value: unknown) {
        return this instanceof Query || value === castFeatureValue(value, this.type);
      },
      message: 'Does not match the type',
    },
  },
});

// model(name, schema, collection): https://mongoosejs.com/docs/models.html
export const FeatureModel = model('Feature', schema, 'features');
