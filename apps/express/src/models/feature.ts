export enum FeatureValueType {
  String = 'string',
  Number = 'number',
  Boolean = 'bool',
}

export type FeatureValue = string | number | boolean;

export interface FeatureSwitch {
  environment?: string;
  version?: string;
  language?: string;
  value: FeatureValueType;
}

export interface Feature {
  _id: any;
  name: string;
  description: string;
  type: FeatureValueType;
  value: FeatureValue;
  switches: FeatureSwitch[];
}
