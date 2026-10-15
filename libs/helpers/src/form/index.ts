import {
  type Feature,
  type FeatureErrors,
  type FeatureValue,
  FeatureValueType,
  isFeatureValueType,
} from '../models/index.js';

export const toInputValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  return '';
};

export const castFeatureValue = (value: unknown, type: FeatureValueType | null): FeatureValue => {
  switch (type) {
    case FeatureValueType.Boolean:
      return typeof value === 'boolean' ? value : value === 'true';
    case FeatureValueType.Number: {
      if (value === '' || value === null || value === undefined) {
        return null;
      }
      const number = typeof value === 'number' ? value : parseFloat(String(value));
      return Number.isFinite(number) ? number : null;
    }
    case FeatureValueType.String:
      return value !== undefined && value !== null ? `${value}` : '';
    default:
      return null;
  }
};

export const normalizeFeature = (data?: Partial<Feature> | null): Feature => {
  const type = isFeatureValueType(data?.type) ? data.type : null;

  return {
    _id: data?._id ?? '',
    key: data?.key ?? '',
    description: data?.description ?? '',
    type,
    value: castFeatureValue(data?.value, type),
  };
};

export const validateFeature = (data?: Partial<Omit<Feature, '_id'>> | null): FeatureErrors | null => {
  const errors: FeatureErrors = {};

  if (!data?.key) {
    errors.key = 'This is required';
  }

  if (!data?.type) {
    errors.type = 'This is required';
  } else if (!isFeatureValueType(data.type)) {
    errors.type = 'Value not allowed';
  } else if (
    data.value === null ||
    data.value === undefined ||
    data.value !== castFeatureValue(data.value, data.type)
  ) {
    errors.value = 'Does not match the type';
  }

  return Object.keys(errors).length ? errors : null;
};

/** Pretty-printed JSON of what the API would return for this feature. */
export const featurePreview = (feature: Pick<Feature, 'key' | 'value'>): string =>
  JSON.stringify({ [feature.key]: feature.value }, null, 2);
