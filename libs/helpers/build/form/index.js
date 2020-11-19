"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFeature = exports.normalizeFeature = exports.castFeatureValue = exports.toInputValue = void 0;
var feature_1 = require("../models/feature");
exports.toInputValue = function (value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return "" + value;
    }
    return '';
};
exports.castFeatureValue = function (value, type) {
    var newValue;
    switch (type) {
        case feature_1.FeatureValueType.Boolean:
            newValue = typeof value === 'boolean' ? value : value === 'true';
            break;
        case feature_1.FeatureValueType.Number:
            newValue = parseFloat(value) || null;
            break;
        case feature_1.FeatureValueType.String:
            newValue = typeof value !== 'undefined' && value !== null ? "" + value : '';
            break;
        default:
            newValue = null;
    }
    return newValue;
};
exports.normalizeFeature = function (data) {
    var type = data && data.type && feature_1.featureValueTypes.includes(data.type) ? data.type : null;
    return {
        _id: data && data._id || '',
        key: data && data.key || '',
        description: data && data.description || '',
        type: type,
        value: type ? exports.castFeatureValue(data && data.value, type) : null,
    };
};
exports.validateFeature = function (data) {
    var errors = {};
    if (!(data && data.key)) {
        errors.key = 'This is required';
    }
    if (!(data && data.type)) {
        errors.type = 'This is required';
    }
    else {
        if (!feature_1.featureValueTypes.includes(data.type)) {
            errors.type = 'Value not allowed';
        }
        else {
            if (data.value !== exports.castFeatureValue(data.value, data.type)) {
                errors.value = 'Does not match the type';
            }
        }
    }
    return Object.keys(errors).length ? errors : null;
};
