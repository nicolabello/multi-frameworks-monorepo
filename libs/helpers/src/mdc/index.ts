import { MDCSelect, MDCTextField } from '@nicolabello/material-components-web';
import { toInputValue } from '../form';

export interface MDCTextFieldProps {
  required?: boolean;
  disabled?: boolean;
  valid?: boolean;
  value?: any;
}

export interface MDCSelectProps extends MDCTextFieldProps {
  onChange?: (value: string) => void
}

export const updateMDCInstance = (instance?: MDCTextField | MDCSelect, props?: MDCTextFieldProps | MDCSelectProps) => {
  if (instance && props) {
    const value = toInputValue(props.value);
    if (instance.value !== value) {
      instance.value = value;
    }
    instance.required = !!props.required;
    instance.disabled = !!props.disabled;
    instance.valid = !!props.valid;
  }
};
