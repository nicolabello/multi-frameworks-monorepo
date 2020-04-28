"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
exports.updateMDCInput = function (instance, props) {
    if (instance && props) {
        instance.required = props.required || false;
        instance.disabled = props.disabled || false;
        var value = exports.toFormValue(props.value);
        if (instance.value !== value) {
            instance.value = value;
        }
        instance.valid = !!props.valid;
    }
};
exports.toFormValue = function (value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return "" + value;
    }
    return '';
};
exports.getUpdatedValue = function (value, type) {
    var newValue = value;
    switch (type) {
        case __1.FeatureValueType.Boolean:
            newValue = typeof value === 'boolean' ? value : value === 'true';
            break;
        case __1.FeatureValueType.Number:
            newValue = parseFloat(value) || null;
            break;
        case __1.FeatureValueType.String:
            newValue = typeof value !== 'undefined' && value !== null ? "" + value : '';
            break;
    }
    return newValue;
};
exports.normalizeValues = function (data) {
    var type = data && data.type && __1.featureValueTypes.includes(data.type) ? data.type : null;
    return {
        _id: data && data._id || '',
        key: data && data.key || '',
        description: data && data.description || '',
        type: type,
        value: type ? exports.getUpdatedValue(data && data.value, type) : null,
    };
};
