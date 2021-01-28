export declare enum FeatureValueType {
    String = "string",
    Number = "number",
    Boolean = "boolean"
}
export declare const featureValueTypes: string[];
export declare type FeatureValue = string | number | boolean | null;
export interface Feature {
    _id?: any;
    key: string;
    description: string;
    type: FeatureValueType | null;
    value: FeatureValue | null;
}
export declare type FeatureErrors = {
    [key in keyof Feature]?: string;
};
