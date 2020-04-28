import { MDCSelect, MDCTextField } from '@nicolabello/material-components-web';
import { Feature, FeatureValue, FeatureValueType, featureValueTypes } from '../';

export interface MDCTextFieldProps {
  required?: boolean;
  disabled?: boolean;
  valid?: boolean;
  value?: any;
}

export interface MDCSelectProps extends MDCTextFieldProps {
  onChange?: (value: any) => any
}

export const updateMDCInput = (instance?: MDCTextField | MDCSelect, props?: MDCTextFieldProps | MDCSelectProps) => {
  if (instance && props) {
    instance.required = props.required || false;
    instance.disabled = props.disabled || false;
    const value = toFormValue(props.value);
    if (instance.value !== value) {
      instance.value = value;
    }
    instance.valid = !!props.valid;
  }
};

export const toFormValue = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  return '';
};

export const getUpdatedValue = (value: any, type: FeatureValueType): FeatureValue => {
  let newValue: FeatureValue = value;

  switch (type) {
    case FeatureValueType.Boolean:
      newValue = typeof value === 'boolean' ? value : value === 'true';
      break;
    case FeatureValueType.Number:
      newValue = parseFloat(value as string) || null;
      break;
    case FeatureValueType.String:
      newValue = typeof value !== 'undefined' && value !== null ? `${value}` : '';
      break;
  }

  return newValue;
};

export const normalizeValues = (data?: Feature): Feature => {

  const type = data && data.type && featureValueTypes.includes(data.type) ? data.type : null;

  return {
    _id: data && data._id || '',
    key: data && data.key || '',
    description: data && data.description || '',
    type: type,
    value: type ? getUpdatedValue(data && data.value, type) : null,
  };

};
