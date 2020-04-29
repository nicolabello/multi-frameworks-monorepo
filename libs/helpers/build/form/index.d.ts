import { Feature, FeatureErrors, FeatureValue, FeatureValueType } from '../models/feature';
export declare const toInputValue: (value: any) => string;
export declare const castFeatureValue: (value: any, type: FeatureValueType) => FeatureValue;
export declare const normalizeFeature: (data?: Feature | undefined) => Feature;
export declare const validateFeature: (data?: Pick<Feature, "key" | "description" | "type" | "value"> | undefined) => FeatureErrors | null;
