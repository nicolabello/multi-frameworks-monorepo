"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureValueTypes = exports.FeatureValueType = void 0;
var FeatureValueType;
(function (FeatureValueType) {
    FeatureValueType["String"] = "string";
    FeatureValueType["Number"] = "number";
    FeatureValueType["Boolean"] = "boolean";
})(FeatureValueType = exports.FeatureValueType || (exports.FeatureValueType = {}));
exports.featureValueTypes = Object.keys(FeatureValueType).map(function (key) { return FeatureValueType[key]; });
