import { describe, expect, it } from 'vitest';
import { FeatureValueType } from '../models/index.js';
import {
  castFeatureValue,
  featurePreview,
  normalizeFeature,
  toInputValue,
  validateFeature,
} from './index.js';

describe('toInputValue', () => {
  it('passes strings through and stringifies numbers', () => {
    expect(toInputValue('abc')).toBe('abc');
    expect(toInputValue(42)).toBe('42');
  });

  it('returns an empty string for anything else', () => {
    expect(toInputValue(null)).toBe('');
    expect(toInputValue(true)).toBe('');
  });
});

describe('castFeatureValue', () => {
  it('casts to boolean', () => {
    expect(castFeatureValue(true, FeatureValueType.Boolean)).toBe(true);
    expect(castFeatureValue('true', FeatureValueType.Boolean)).toBe(true);
    expect(castFeatureValue('nope', FeatureValueType.Boolean)).toBe(false);
  });

  it('casts to number, keeping zero', () => {
    expect(castFeatureValue('1.5', FeatureValueType.Number)).toBe(1.5);
    expect(castFeatureValue(0, FeatureValueType.Number)).toBe(0);
    expect(castFeatureValue('0', FeatureValueType.Number)).toBe(0);
    expect(castFeatureValue('abc', FeatureValueType.Number)).toBeNull();
    expect(castFeatureValue('', FeatureValueType.Number)).toBeNull();
  });

  it('casts to string', () => {
    expect(castFeatureValue(12, FeatureValueType.String)).toBe('12');
    expect(castFeatureValue(null, FeatureValueType.String)).toBe('');
  });

  it('returns null without a type', () => {
    expect(castFeatureValue('x', null)).toBeNull();
  });
});

describe('normalizeFeature', () => {
  it('fills defaults for missing data', () => {
    expect(normalizeFeature()).toEqual({ _id: '', key: '', description: '', type: null, value: null });
  });

  it('drops unknown types and casts the value', () => {
    expect(normalizeFeature({ key: 'k', type: 'nope' as never, value: 'x' }).type).toBeNull();
    expect(normalizeFeature({ key: 'k', type: 'number', value: '3' }).value).toBe(3);
  });
});

describe('validateFeature', () => {
  it('requires key and type', () => {
    expect(validateFeature({})).toEqual({ key: 'This is required', type: 'This is required' });
  });

  it('rejects values that do not match the type', () => {
    expect(validateFeature({ key: 'k', type: 'number', value: 'abc' })).toEqual({
      value: 'Does not match the type',
    });
    expect(validateFeature({ key: 'k', type: 'number', value: null })).toEqual({
      value: 'Does not match the type',
    });
  });

  it('accepts a valid feature', () => {
    expect(validateFeature({ key: 'k', description: '', type: 'boolean', value: false })).toBeNull();
    expect(validateFeature({ key: 'k', description: '', type: 'number', value: 0 })).toBeNull();
  });
});

describe('featurePreview', () => {
  it('renders the response shape', () => {
    expect(featurePreview({ key: 'darkMode', value: true })).toBe('{\n  "darkMode": true\n}');
  });
});
