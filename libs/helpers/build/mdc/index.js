"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("../form");
exports.updateMDCInstance = function (instance, props) {
    if (instance && props) {
        var value = form_1.toInputValue(props.value);
        if (instance.value !== value) {
            instance.value = value;
        }
        instance.required = !!props.required;
        instance.disabled = !!props.disabled;
        instance.valid = !!props.valid;
    }
};
