import { Feature, FeatureErrors, FeatureValue, FeatureValueType, featureValueTypes } from '../models/feature';

export const toInputValue = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  return '';
};

export const castFeatureValue = (value: any, type: FeatureValueType): FeatureValue => {
  let newValue: FeatureValue;

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
    default:
      newValue = null;
  }

  return newValue;
};

export const normalizeFeature = (data?: Feature): Feature => {

  const type = data && data.type && featureValueTypes.includes(data.type) ? data.type : null;

  return {
    _id: data && data._id || '',
    key: data && data.key || '',
    description: data && data.description || '',
    type: type,
    value: type ? castFeatureValue(data && data.value, type) : null,
  };

};

export const validateFeature = (data?: Omit<Feature, '_id'>): FeatureErrors | null => {

  const errors: FeatureErrors = {};

  if (!(data && data.key)) {
    errors.key = 'This is required';
  }

  if (!(data && data.type)) {
    errors.type = 'This is required';
  } else {
    if (!featureValueTypes.includes(data.type)) {
      errors.type = 'Value not allowed';
    } else {
      if (data.value !== castFeatureValue(data.value, data.type)) {
        errors.value = 'Does not match the type';
      }
    }
  }

  return Object.keys(errors).length ? errors : null;

};
