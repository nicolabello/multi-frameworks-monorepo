import { MDCSelect, MDCTextField } from '@nicolabello/material-components-web';
import { Feature, FeatureValue, FeatureValueType } from '../';
export interface MDCTextFieldProps {
    required?: boolean;
    disabled?: boolean;
    valid?: boolean;
    value?: any;
}
export interface MDCSelectProps extends MDCTextFieldProps {
    onChange?: (value: any) => any;
}
export declare const updateMDCInput: (instance?: MDCTextField | MDCSelect | undefined, props?: MDCTextFieldProps | MDCSelectProps | undefined) => void;
export declare const toFormValue: (value: any) => string;
export declare const getUpdatedValue: (value: any, type: FeatureValueType) => FeatureValue;
export declare const normalizeValues: (data?: Feature | undefined) => Feature;
