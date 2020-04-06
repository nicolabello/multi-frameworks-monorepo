import mongoose from 'mongoose';
import { Feature } from './feature';

interface FeatureDocument extends mongoose.Document, Feature {}

const schema = new mongoose.Schema<FeatureDocument>({
  name: { type: String, required: true },
  value: Boolean,
});

/*
// Trying to use loadClass for methods, statics and virtuals
class FeatureClass {
  get fullName(this: FeatureInterface): string {
    return `${this.name} get`;
  }

  set fullName(this: FeatureInterface, name: string) {
    this.name = `${name} set`;
  }

  public static findByFullName(
    this: mongoose.Model<FeatureInterfaceExtended>,
    name: string
  ) {
    return this.findOne({ name });
  }
}

schema.loadClass(FeatureClass);

type FeatureInterfaceExtended = FeatureInterface & FeatureClass
*/

export const FeatureModel = mongoose.model<FeatureDocument>(
  'Feature',
  schema,
  'features'
);
