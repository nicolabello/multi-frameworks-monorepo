import mongoose from 'mongoose';

interface FeatureInterface extends mongoose.Document {
  name: string;
  value?: boolean;
}

const schema = new mongoose.Schema<FeatureInterface>({
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

export const Feature = mongoose.model<FeatureInterface>(
  'Feature',
  schema,
  'features'
);
