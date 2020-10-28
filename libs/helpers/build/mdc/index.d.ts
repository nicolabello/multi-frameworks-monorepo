import { MDCSelect, MDCTextField } from '@nicolabello/material-components-web';
export interface MDCTextFieldProps {
    required?: boolean;
    disabled?: boolean;
    valid?: boolean;
    value?: any;
}
export interface MDCSelectProps extends MDCTextFieldProps {
    onChange?: (value: string) => void;
}
export declare const updateMDCInstance: (instance?: MDCSelect | MDCTextField | undefined, props?: MDCTextFieldProps | MDCSelectProps | undefined) => void;
