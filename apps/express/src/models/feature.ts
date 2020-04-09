export enum FeatureValueType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

export const featureValueTypes: string[] = Object.keys(
  FeatureValueType
// @ts-ignore
).map(key => FeatureValueType[key]);

export type FeatureValue = string | number | boolean;

/*export interface FeatureSwitch {
  environment?: string;
  version?: string;
  language?: string;
  value: FeatureValueType;
}*/

export interface Feature {
  _id: any;
  key: string;
  description: string;
  type: FeatureValueType;
  value: FeatureValue;
  // switches: FeatureSwitch[];
}
