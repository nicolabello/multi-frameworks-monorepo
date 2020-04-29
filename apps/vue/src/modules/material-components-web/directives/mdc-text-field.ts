import { MDCTextFieldProps, updateMDCInstance } from '@feature-toggles/helpers';
import { MDCTextField } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

type CustomHTMLElement = HTMLElement & {
  textFieldInstance?: MDCTextField;
}

const mdcTextField: DirectiveOptions = {
  inserted: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    el.textFieldInstance = MDCTextField.attachTo(el);
    el.textFieldInstance.useNativeValidation = false;
    updateMDCInstance(el.textFieldInstance, binding.value as MDCTextFieldProps);
  },
  update: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    updateMDCInstance(el.textFieldInstance, binding.value as MDCTextFieldProps);
  },
  unbind: (el: CustomHTMLElement) => {
    el.textFieldInstance?.destroy();
  },
};

export default mdcTextField;
