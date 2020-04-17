export enum FeatureValueType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

export const featureValueTypes: string[] = Object.keys(FeatureValueType).map(
  (key) => (FeatureValueType as any)[key] as string
);

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
  type: FeatureValueType | null;
  value: FeatureValue | null;
  // switches: FeatureSwitch[];
}
