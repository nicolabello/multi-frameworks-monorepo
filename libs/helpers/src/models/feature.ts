export const FeatureValueType = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
} as const;

export type FeatureValueType = (typeof FeatureValueType)[keyof typeof FeatureValueType];

export const featureValueTypes: readonly FeatureValueType[] = Object.values(FeatureValueType);

export const isFeatureValueType = (value: unknown): value is FeatureValueType =>
  featureValueTypes.includes(value as FeatureValueType);

export type FeatureValue = string | number | boolean | null;

export interface Feature {
  _id?: string;
  key: string;
  description: string;
  type: FeatureValueType | null;
  value: FeatureValue;
}

export type FeatureErrors = { [key in keyof Feature]?: string };
