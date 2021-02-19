import { MDCTextFieldProps, updateMDCInstance } from '@feature-toggles/helpers';
import { MDCTextField } from '@nicolabello/material-components-web';
import { Directive, DirectiveBinding } from 'vue';

type CustomHTMLElement = HTMLElement & {
  textFieldInstance?: MDCTextField;
}

const mdcTextField: Directive = {
  mounted: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    el.textFieldInstance = MDCTextField.attachTo(el);
    el.textFieldInstance.useNativeValidation = false;
    updateMDCInstance(el.textFieldInstance, binding.value as MDCTextFieldProps);
  },
  updated: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    updateMDCInstance(el.textFieldInstance, binding.value as MDCTextFieldProps);
  },
  unmounted: (el: CustomHTMLElement) => {
    el.textFieldInstance?.destroy();
  },
};

export default mdcTextField;
