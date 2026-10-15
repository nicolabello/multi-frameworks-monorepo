// A "const object" + a type with the same name: a lightweight alternative to a TypeScript `enum`.
// It's plain JavaScript (works with `erasableSyntaxOnly` and Node's type stripping) and still gives
// readable names (FeatureValueType.Boolean) plus a union type ('string' | 'number' | 'boolean').
// https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
export const FeatureValueType = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
} as const;

export type FeatureValueType = (typeof FeatureValueType)[keyof typeof FeatureValueType];

export const featureValueTypes: readonly FeatureValueType[] = Object.values(FeatureValueType);

/**
 * Type guard: when it returns true, TypeScript narrows `value` to `FeatureValueType`.
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export const isFeatureValueType = (value: unknown): value is FeatureValueType =>
  featureValueTypes.includes(value as FeatureValueType);

export type FeatureValue = string | number | boolean | null;

export interface Feature {
  /** MongoDB id, as a string; empty or missing for features that haven't been saved yet */
  _id?: string;
  /** The key the value is exposed under, e.g. `darkMode` */
  key: string;
  description: string;
  type: FeatureValueType | null;
  value: FeatureValue;
}

/** One error message per invalid field. Mapped type: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html */
export type FeatureErrors = { [key in keyof Feature]?: string };
